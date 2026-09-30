import fs from 'node:fs'
import path from 'node:path'

const EXTENSIONS = ['', '.jsx', '.js']
const FIX = process.argv.includes('--fix')
let problems = 0
let fixed = 0

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.(jsx?|mjs)$/.test(entry.name)) checkFile(full)
  }
}

// true only if every folder/file in the path exists with exactly this casing
function existsExact(target) {
  const parts = path.relative(process.cwd(), target).split(path.sep)
  let current = process.cwd()
  for (const part of parts) {
    if (!fs.existsSync(current) || !fs.readdirSync(current).includes(part)) return false
    current = path.join(current, part)
  }
  return fs.statSync(current).isFile()
}

// Find the real on-disk spelling of an import path, ignoring case. Returns null if not found.
function findRealSpec(fromDir, spec) {
  const parts = spec.split('/')
  let current = fromDir
  const out = []
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (part === '.' || part === '..') {
      out.push(part)
      current = path.resolve(current, part)
      continue
    }
    const isLast = i === parts.length - 1
    const names = fs.existsSync(current) ? fs.readdirSync(current) : []
    const candidates = isLast ? EXTENSIONS.map((ext) => part + ext) : [part]
    const match = names.find((n) => candidates.some((c) => c.toLowerCase() === n.toLowerCase()))
    if (!match) return null
    // keep the extension style the import used (usually none)
    const ext = EXTENSIONS.find((e) => e && match.toLowerCase() === (part + e).toLowerCase()) || ''
    out.push(isLast && ext ? match.slice(0, -ext.length) : match)
    current = path.join(current, match)
  }
  return out.join('/')
}

function checkFile(file) {
  let code = fs.readFileSync(file, 'utf8')
  let changed = false
  for (const match of code.matchAll(/(?:import|from)\s+['"](\.{1,2}\/[^'"]+)['"]/g)) {
    const spec = match[1]
    const base = path.resolve(path.dirname(file), spec)
    if (EXTENSIONS.some((ext) => existsExact(base + ext))) continue

    const real = findRealSpec(path.dirname(file), spec)
    if (FIX && real) {
      code = code.split(`'${spec}'`).join(`'${real}'`).split(`"${spec}"`).join(`"${real}"`)
      changed = true
      fixed++
      console.log(`✔ ${path.relative(process.cwd(), file)}  '${spec}' → '${real}'`)
    } else {
      problems++
      const hint = real ? `  (should be '${real}')` : '  (file not found at all)'
      console.log(`✗ ${path.relative(process.cwd(), file)}  imports  '${spec}'${hint}`)
    }
  }
  if (changed) fs.writeFileSync(file, code)
}

walk(path.join(process.cwd(), 'src'))
if (fixed) console.log(`\nFixed ${fixed} import(s).`)
console.log(
  problems
    ? `\n${problems} import(s) need fixing.${FIX ? '' : ' Run: node scripts/check-case.mjs --fix'}`
    : '✓ All imports match file names exactly.',
)