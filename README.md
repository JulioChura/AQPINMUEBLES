# ⬛ AQP Inmuebles - Frontend

> A production-ready, responsive rental property discovery platform built with Vue 3, tailored for university housing in Arequipa.

![Vue](https://img.shields.io/badge/Vue-3.5-brightgreen?style=flat-square&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-7.1-purple?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ▣ Table of Contents

- [Overview](#overview)
- [Technical Highlights](#technical-highlights)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Project Architecture](#project-architecture)
- [Features](#features)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Credits](#credits)

---

## ◈ Overview

**AQP Inmuebles** is a sophisticated, full-featured property rental discovery platform engineered for university students seeking accommodation in Arequipa, Peru. The application provides an intuitive interface for students to browse, filter, and interact with rental properties near major universities, while offering property owners robust tools to manage listings and engage with potential tenants.

The frontend has been architected as a production-grade application, featuring:
- ★ **Seamless user experience** across desktop, tablet, and mobile devices
- ◆ **Secure authentication** with token-based JWT management
- ▶ **Interactive mapping** integration for property location visualization
- ◐ **Dark mode support** with persistent user preferences
- ⚡ **Optimized performance** with lazy loading and efficient state management

---

## ◈ Screenshots

![](docs/picture1.png)

![](docs/picture2.png)

![](docs/picture3.png)

<details>
<summary><strong>Ver más imágenes (7 más)</strong></summary>

![](docs/picture4.png)

![](docs/picture5.png)

![](docs/picture6.png)

![](docs/picture7.png)

![](docs/picture8.png)

![](docs/picture9.png)

![](docs/picture10.png)

</details>

---

## ⚙ Technical Highlights

### Responsive Architecture
The entire application interface has been architected to be **fully responsive** across all device sizes. This includes:
- Fluid grid layouts using a mobile-first approach
- Adaptive navigation with hamburger menu on smaller screens
- Responsive property cards and filtering components
- Touch-optimized interactive elements for mobile users

### Performance Optimization
- **Code splitting** for faster initial load times
- **Efficient state management** with Pinia (with persistent storage)
- **Request deduplication** and cancellation for filter operations
- **Lazy loading** of components and images
- **Optimized bundle size** through strategic dependency management

### Code Standardization & Best Practices
- Unified component structure with Vue 3 Composition API
- Consistent error handling and API integration patterns
- Type-safe HTTP requests with Axios interceptors
- Modular store architecture for scalable state management
- Comprehensive UI consistency via Vuetify and TailwindCSS integration

---

## ◉ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Vue 3.5 | Progressive JavaScript framework |
| **Build Tool** | Vite 7.1 | Lightning-fast module bundler |
| **Styling** | TailwindCSS 4.1 | Utility-first CSS framework |
| **UI Components** | Vuetify 3.10 | Material Design component library |
| **State Management** | Pinia 3.0 | Type-safe state management |
| **HTTP Client** | Axios 1.12 | Promise-based HTTP client |
| **Routing** | Vue Router 4.5 | Official router for Vue.js |
| **Icons** | Lucide Vue 0.552 | Beautifully consistent icon set |
| **Utilities** | VueUse, DOMPurify | Enhanced reactivity & security |
| **Maps** | Leaflet 1.9 | Interactive mapping library |

---

## ⬇ Installation & Setup

### Prerequisites
- **Node.js** >= 16.x
- **npm** >= 8.x or **yarn** >= 1.22.x

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/AQPINMUEBLES.git
cd AQPINMUEBLES
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
Create a `.env.local` file in the project root with the following variables:

```env
# Backend API Configuration
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_AUTH_ENDPOINT=/api/auth

# Google OAuth (Optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Application Environment
VITE_APP_ENV=development
```

> **Note:** The backend API is expected to run locally at `http://127.0.0.1:8000`. Adjust the `VITE_API_BASE_URL` accordingly for different environments.

### Step 4: Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173` with Hot Module Replacement (HMR) enabled.

### Step 5: Build for Production
```bash
npm run build
```

The optimized production build will be generated in the `dist/` directory.

### Step 6: Preview Production Build
```bash
npm run preview
```

---

## ◼ Project Architecture

```
src/
├── components/              # Reusable Vue components
│   ├── authorization/      # Authentication-related components
│   ├── MisPropiedades/     # Property management sections
│   ├── Profile/            # User profile components
│   ├── icons/              # Custom icon components
│   └── [base components]   # Common UI components
├── views/                   # Full-page components (routes)
│   ├── Home.vue            # Landing page
│   ├── SearchDepa.vue      # Property search & filtering
│   ├── ViewDepa.vue        # Property details
│   ├── Register*.vue       # Registration flows
│   ├── MisPropiedades/     # Property management (owner)
│   └── Profile/            # User profile management
├── stores/                  # Pinia state management
│   ├── auth.js             # Authentication state
│   ├── useGestionPropiedades.js    # Property management
│   ├── useGestionComments.js       # Comments system
│   ├── useCreateProperty.js        # Property creation
│   └── webPageData.js      # Static page data
├── router/
│   └── index.js            # Route definitions
├── App.vue                  # Root component
├── main.js                  # Application entry point
└── assets/                  # Static assets
```

### Key Store Modules

**`auth.js`** - Manages user authentication state and sessions
- Login/logout functionality
- Google OAuth integration
- Token management (access & refresh tokens)
- Cross-tab session synchronization

**`useGestionPropiedades.js`** - Central hub for property data management
- CRUD operations for user properties
- Public property listing & filtering
- Favorites system with persistent storage
- Pagination and advanced filtering with request cancellation

**`useGestionComments.js`** - Manages comment/review system
- Comment creation and deletion
- Comment retrieval and caching

**`useCreateProperty.js`** - Handles multi-step property creation
- Form state management across 5 steps
- Image upload and validation
- Location mapping integration

---

## ✦ Features

### ▹ **Property Discovery**
- Advanced filtering by university, location, property type
- Price range filtering with responsive sliders
- Real-time search suggestions with thumbnails
- Interactive map view for property locations

### ▹ **User Management**
- Secure JWT-based authentication
- Student and property owner registration
- Google OAuth integration
- Profile customization and verification

### ▹ **Property Management (Owners)**
- Multi-step property creation wizard
- Photo gallery management
- Property analytics dashboard
- Direct messaging with interested tenants

### ▹ **Dark Mode**
- System-preference detection
- Manual toggle with persistent storage
- Comprehensive dark theme coverage

### ▹ **Community Features**
- Comment/review system
- Favorites and saved properties
- Messaging between users
- Property notification system

---

## ◈ Available Scripts

```bash
# Development: Start Vite dev server with HMR
npm run dev

# Build: Compile Vue components to optimized production bundle
npm run build

# Preview: Serve production build locally for testing
npm run preview
```

---

## ◐ Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000` | Backend API base URL |
| `VITE_API_AUTH_ENDPOINT` | `/api/auth` | Authentication endpoint path |
| `VITE_GOOGLE_CLIENT_ID` | - | Google OAuth client ID |
| `VITE_APP_ENV` | `development` | Application environment |

---

## ▲ Recommended IDE Setup

For the best development experience, use:

- **Editor**: [VSCode](https://code.visualstudio.com/)
- **Vue Extension**: [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if installed)
- **Additional Extensions**:
  - Tailwind CSS IntelliSense
  - Vite
  - Thunder Client or Postman for API testing

---

## ◈ Credits

This project is a **fork** from the original repository. 

**Lead Frontend Architect & Refactoring**: The application has undergone comprehensive end-to-end refactoring to transform the initial proof-of-concept into a production-ready solution. Key contributions include:

- ► **End-to-End Refactoring**: Complete restructuring of component architecture for scalability and maintainability
- ► **Responsive Design Implementation**: Full responsive redesign ensuring seamless experience across all device sizes
- ► **Logic Polish & Bug Fixes**: Extensive debugging, state management optimization, and API integration refinement
- ► **Standardization**: Implementation of consistent code structure, naming conventions, and UI/UX patterns

---

## ◊ License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built for the university housing community in Arequipa** ◈
