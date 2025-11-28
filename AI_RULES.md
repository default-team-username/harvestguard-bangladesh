# AI Development Rules for HarvestGuard

This document outlines the technical stack and specific rules for developing and modifying the HarvestGuard application.

## Tech Stack Overview

1.  **Framework:** React (TypeScript).
2.  **Build Tool:** Vite.
3.  **Styling:** Tailwind CSS, prioritizing responsive design and utility classes.
4.  **UI Library:** shadcn/ui (built on Radix UI).
5.  **Routing:** React Router DOM.
6.  **Data Management:** TanStack Query (React Query) for server state management.
7.  **Forms & Validation:** React Hook Form paired with Zod.
8.  **Icons:** Lucide React.
9.  **Notifications:** Sonner for modern toast notifications.
10. **Internationalization (i18n):** Custom context-based system supporting English (en) and Bengali (bn).

## Development Guidelines and Library Usage

### 1. Component Structure
*   **Location:** Components must be placed in `src/components/` and pages in `src/pages/`.
*   **Size:** Aim for small, focused components (ideally under 100 lines). Create a new file for every new component or hook.
*   **Shadcn/ui:** Use pre-built shadcn/ui components. Do not modify the files in `src/components/ui/`. If customization is needed, create a new component that wraps or extends the base UI component.

### 2. Styling and Design
*   **CSS:** All styling must be done using Tailwind CSS utility classes.
*   **Responsiveness:** All designs must be responsive by default.
*   **Theming:** The application supports light and dark modes (defined in `src/index.css`). Ensure new components respect these themes.
*   **Custom Colors:** Utilize the custom `harvest` color palette defined in `tailwind.config.ts` and `src/index.css`.

### 3. Routing and Navigation
*   **Library:** Use `react-router-dom`.
*   **Route Definition:** All primary routes must be defined within `src/App.tsx`.

### 4. Data and State
*   **Server State:** Use `@tanstack/react-query` for fetching, caching, and updating server data.
*   **Local State:** Use standard React `useState` and `useReducer`.

### 5. Forms
*   **Implementation:** Use `react-hook-form` for managing form state and submission.
*   **Validation:** Use `zod` for defining form schemas and validation rules.

### 6. Internationalization (i18n)
*   **Mandatory:** All user-facing text must be translated into both English (`en`) and Bengali (`bn`) using the `useLanguage` hook from `src/contexts/LanguageContext.tsx`.

### 7. Notifications
*   **Toasts:** Use the `Sonner` component (imported as `Sonner` in `src/App.tsx`) for displaying non-intrusive notifications.

### 8. Assets
*   **Icons:** Use icons exclusively from `lucide-react`.