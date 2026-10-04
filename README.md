# Smart Pantry

A full-stack pantry tracker that catches food before it expires and suggests recipes to use it up.

Built for **CS3301 Full Stack Development, CIE-2 (React Mini Project)**

## Features

- **Pantry management**: add items with quantity, unit, storage place and expiry date; use one at a time or delete
- **Search and category filters** (Fridge, Freezer, Pantry) with live counts
- **Validated form**: client-side and server-side validation with clear error messages
- **Expiry tracking** *(modification 1)*: colour-coded status badges, dashboard stat cards and a "Use It Soon" list sorted by urgency
- **Recipe Rescue** *(modification 2)*: one click from an expiring item to recipes that use it, with a detail page that marks the ingredients you already have
- **Persistent storage** in MongoDB Atlas through an Express REST API
- Responsive layout for phone, tablet and desktop

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, React Router 7, Tailwind CSS 4, Vite |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas with Mongoose |
| External API | [TheMealDB](https://www.themealdb.com/api.php) (free, no key) |

## React concepts implemented

| Requirement | Where |
|---|---|
| Components | `src/components/*` (Navbar, PantryList, PantryItem, ExpiryBadge, StatCard, RecipeCard…) |
| Class component | `ErrorBoundary.jsx` (`getDerivedStateFromError`, `componentDidCatch`); demo at `/error-demo` |
| Functional components | Every page and UI section |
| Parent–child | `App → Pantry → PantryList → PantryItem` (data down via props, events up via `onUse` / `onDelete`) |
| Props | `items`, `onUse`, `onDelete`, `tone`, `expiryDate`… |
| useState | Pantry state in `App`, form fields, search and filter state, fetch results |
| useEffect | Loading items from the API on mount, recipe fetches keyed on the URL, `document.title` |
| Event handling | `onClick`, `onChange`, `onSubmit` |
| Form handling | `AddItemForm.jsx`: controlled inputs, validation, redirect with `useNavigate` |
| Client-side routing | `/`, `/pantry`, `/add`, `/recipes`, `/recipes/:id`, `*` (404); `useParams`, `useSearchParams`, `useLocation` |
| Responsive UI | Tailwind breakpoints (`sm` / `md` / `lg`), mobile navbar menu |
| Express backend | `server/`: Router, REST routes, `req.params` / `req.query` / `req.body`, custom middleware, error handling |

## API

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Server and database status |
| GET | `/api/items` | All pantry items, newest first |
| POST | `/api/items` | Add an item (validated; `400` with details if invalid) |
| PATCH | `/api/items/:id/use` | Use one; removes the item at quantity 0 |
| DELETE | `/api/items/:id` | Delete an item (`204`, or `404` if missing) |
| POST | `/api/items/reset` | Restore the sample data |
| GET | `/api/recipes?ingredient=spinach` | Recipes using an ingredient (via TheMealDB, cached for 1 hour) |
| GET | `/api/recipes/:id` | Full recipe with a cleaned-up ingredient list |

## Project structure:

```
server/
  index.js            Express app: middleware, routes, error handling, serves the React build
  db.js               MongoDB connection
  models/Item.js      Mongoose schema
  routes/items.js     Pantry REST API
  routes/recipes.js   TheMealDB proxy
  middleware/         logger, requireDb (503 when DB is down), 404 + error handler
src/
  App.jsx             Routes and shared pantry state
  api/                fetch helpers (client, items, recipes)
  components/         reusable UI components
  pages/              Dashboard, Pantry, AddItem, Recipes, RecipeDetail, NotFound, ErrorDemo
  utils/              date and expiry logic
scripts/
  test-api.mjs        end-to-end API checks
  check-case.mjs      catches import/file-name case mismatches before deploying to Linux
```

## Run locally:

Requires Node.js 22.12+ and a free MongoDB Atlas cluster.

```bash
npm install
cp .env.example .env      # then put your Atlas connection string in .env
npm run dev               # React on http://localhost:5173, Express on http://localhost:3001
```

Other scripts:

```bash
node scripts/test-api.mjs     # API checks (server must be running)
npm run build && npm start    # production mode: one server on http://localhost:3001
```

## Deployment (Render) [Yet to be done]:

1. New **Web Service** connected to this repository
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Environment variable: `MONGODB_URI` (your Atlas connection string, including `/smartpantry`)
5. In Atlas → Network Access, allow `0.0.0.0/0` so Render can connect

## Modifications beyond:

1. **Expiry tracking and a Use It Soon dashboard.** The tutorial's grocery list has no idea of time. Each item's status (fresh, use soon within 3 days, or expired) is derived from its expiry date at render time, shown as colour-coded badges and card edges, summarised in stat cards and listed by urgency.
2. **Recipe Rescue.** Expiring items link straight to recipes that use them. The Express server proxies TheMealDB (validation, reshaping, caching, `502` on upstream failure), and the detail page shows which ingredients are already in the pantry.

Beyond these, the localStorage-only tutorial app was rebuilt as a full-stack app with an Express REST API and MongoDB Atlas.
