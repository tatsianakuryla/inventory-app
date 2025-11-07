# Inventory App - Client

A modern, full-featured inventory management system built with React, TypeScript, and Vite. This application allows users to create and manage inventories with customizable fields, access control, discussions, and comprehensive item tracking.

## Live Demo

🚀 **[https://site--inventory-app--sm9fnltkyqvh.code.run/](https://site--inventory-app--sm9fnltkyqvh.code.run/)**

## Features

- **User Authentication**: Email/password, Google OAuth, and Facebook login support
- **Inventory Management**: Create, update, and delete inventories with custom configurations
- **Custom Fields**: Define custom field types (text, long text, numbers, links, booleans) for inventory items
- **Custom Item IDs**: Configure custom ID formats with sequences, prefixes, and suffixes
- **Access Control**: Share inventories with other users and manage permissions
- **Item CRUD Operations**: Full create, read, update, and delete capabilities for items
- **Item Likes**: Like/unlike items with real-time counter updates
- **Discussions**: Comment system for collaborative inventory management
- **Statistics**: View inventory statistics and analytics
- **Export**: Export items in various formats
- **Admin Panel**: User management, role assignment, and blocking capabilities
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Mobile-first approach with modern UI/UX

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router v7
- **Tables**: TanStack Table
- **Drag & Drop**: DnD Kit
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Markdown**: react-markdown with GitHub Flavored Markdown

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running (see `/server` directory)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd inventory-app/client
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `https://localhost:5173` (HTTPS for OAuth).

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
src/
├── api/                    # API services and schemas
├── appRouter/              # Routing configuration
├── components/             # Reusable UI components
│   ├── CreateItemForm/    # Item creation form
│   ├── EditItemForm/      # Item editing form
│   ├── LikeButton/        # Like button component
│   └── ...
├── hooks/                  # Custom React hooks
├── pages/                  # Page components
│   ├── InventoryViewPage/ # Inventory detail view
│   ├── ItemCreatePage/    # Item creation page
│   ├── ItemEditPage/      # Item editing page
│   └── ...
├── shared/                 # Shared utilities and types
│   ├── typeguards/        # Type guard functions
│   └── types/             # TypeScript type definitions
├── stores/                 # Zustand stores
└── main.tsx               # Application entry point
```

## Code Quality

This project uses:

- **ESLint** with strict TypeScript rules
- **Prettier** for code formatting
- **Husky** for pre-commit hooks
- **lint-staged** for staged file linting

Code style is automatically enforced on commit.

## API Integration

The client communicates with the backend API. See the API documentation in the server directory for endpoint details.

### Main API Endpoints

#### Users (`/api/users`)

- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update user profile
- `GET /api/users/autocomplete` - Search users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login
- `POST /api/users/google/login` - Google OAuth login
- `POST /api/users/facebook/login` - Facebook login

#### Admin (`/api/admin`)

- `GET /api/admin/users` - Get all users (admin only)
- `POST /api/admin/users/block` - Block user
- `POST /api/admin/users/unblock` - Unblock user
- `POST /api/admin/users/change-role` - Change user role

#### Inventory (`/api/inventory`)

- `POST /api/inventory` - Create inventory
- `GET /api/inventory` - Get all inventories
- `GET /api/inventory/:inventoryId` - Get inventory by ID
- `PATCH /api/inventory/:inventoryId` - Update inventory
- `DELETE /api/inventory` - Delete inventories
- `GET /api/inventory/:inventoryId/access` - Get access data
- `PUT /api/inventory/:inventoryId/access` - Update access
- `DELETE /api/inventory/:inventoryId/access` - Revoke access
- `PUT /api/inventory/:inventoryId/fields` - Update custom fields
- `PUT /api/inventory/:inventoryId/id-format` - Update ID format
- `GET /api/inventory/:inventoryId/statistics` - Get statistics

#### Items (`/api/items`)

- `GET /api/items` - Get all items
- `GET /api/items/:itemId` - Get item by ID
- `POST /api/items` - Create item
- `PATCH /api/items/:itemId` - Update item
- `DELETE /api/items` - Delete items
- `POST /api/items/:itemId/like` - Like item
- `DELETE /api/items/:itemId/like` - Unlike item
- `GET /api/items/export` - Export items

#### Categories (`/api/categories`)

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PATCH /api/categories/:categoryId` - Update category
- `DELETE /api/categories` - Delete categories

#### Tags (`/api/tags`)

- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create tag
- `DELETE /api/tags` - Delete tags

#### Discussions (`/api/discussions`)

- `GET /api/discussions` - Get discussions
- `POST /api/discussions` - Create discussion
- `GET /api/discussions/:discussionId` - Get discussion
- `POST /api/discussions/:discussionId/comments` - Add comment
- `DELETE /api/discussions/:discussionId` - Delete discussion

#### Home (`/api/home`)

- `GET /api/home/stats` - Get statistics
- `GET /api/home/activity` - Get recent activity

## Building for Production

1. Build the application:

```bash
npm run build
```

2. The output will be in the `dist/` directory.

3. Serve the production build:

```bash
npm start
```
