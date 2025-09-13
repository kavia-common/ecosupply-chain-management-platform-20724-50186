# Supply Chain Sustainability Frontend

A React web application enabling organizations to manage and improve environmental impact throughout their supply chain.

Features
- Secure user management with roles: Admin, User, Supplier
- Supplier management dashboard
- Compliance and auditing modules
- Intelligent supplier categorization
- Sustainability goal setting
- Performance metrics and reporting
- Automated data ingestion from files/APIs (simulated)
- Corrective action plans management
- Educational resources section
- Tiered auditing and verification tools
- Responsive layout, theme toggle, and accessible components

Tech
- React 18 with react-router-dom, Context API
- Lightweight CSS (no heavy UI frameworks)
- Dummy in-memory services to simulate APIs
- Structured for maintainability and scalability

Getting Started
- npm install
- npm start (http://localhost:3000)

Environment
Create a .env file (see .env.example) to override defaults like site URL.

Project Structure
- src/
  - index.js, App.js, App.css
  - routes/ (app routes)
  - contexts/ (Auth, Theme)
  - components/ (Nav, Sidebar, Layout, Tables, Forms, Charts)
  - pages/ (feature modules)
  - services/ (dummy api/service modules)
  - data/ (static mock data)
  - utils/ (helpers)
  - assets/ (logos/placeholders)

Notes
- Replace services in src/services with real backend integrations later.
- Role-based navigation is implemented in Nav/Sidebar and ProtectedRoute.
- For Supabase or other providers, add integration service and update documentation.
