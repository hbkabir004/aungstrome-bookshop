# Aungstrome Bookshop

Welcome to the **Aungstrome Bookshop** repository! This React.js web application allows users to search for books, filter them by genre, and manage a wishlist. The project features a paginated list of books fetched from the [Gutenberg Project API](https://gutendex.com/books/), and preferences (like search and filters) are persisted using `localStorage`. Below is a comprehensive guide on the project structure, tech stacks, and installation steps.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Skeleton](#project-skeleton)
4. [Tech Stack](#tech-stack)
5. [Installation](#installation)
6. [Usage](#usage)

---

## **Project Overview**

This is a responsive web application that allows users to:

- Search and browse books with pagination.
- Filter books by genres.
- Manage a wishlist (stored using `localStorage`).
- Store search, filter, and pagination preferences for consistency across page reloads.
  It leverages **React.js** for the frontend and integrates with the Gutenberg Book API to fetch book data dynamically.

---

## **Features**

- **Search Functionality:** Search for books by title.
- **Filter by Genre:** Filter books dynamically using dropdowns.
- **Pagination:** Navigate through books in pages.
- **Wishlist Management:** Add or remove books from the wishlist.
- **LocalStorage Persistence:** Search, filter, pagination, and wishlist states persist after refresh.
- **Smooth Animations:** Smooth transitions for showing or hiding books.
- **Sticky Navbar:** Ensures easy access to the search and filter controls.

---

## **Project Skeleton**

```
Book-Store/
│
├── public/                  # Static assets
│   └── vite.svg
│
├── src/                     # Source files
│   ├── components/          # Reusable React components
│   │   ├── BookCard.jsx     # Displays individual book details
│   │   ├── BookList.jsx     # Displays all books
│   │   ├── GenreFilter.jsx  # Genre filter dropdown
│   │   ├── Loading.jsx      # Loading animation
│   │   ├── Navbar.jsx       # Application header
│   │   ├── Pagination.jsx   # Handles page navigation
│   │   └── SearchBar.jsx    # Search input component
│   │
│   ├── pages/   
│   │   └── HomePage.jsx   	 # Main page of the application
│   │   └── Wishlist.jsx   	 # WishList page of the application
│   │   └── BookDetails.jsx  # BookDetails Page of the application
│   │
│   ├── hooks/   
│   │   └── useDebounce.js    
│   │   └── useLocalStorage.js
│   │   └── useTheme.js       
│   │
│   ├── App.jsx            # Root React component
│   └── main.jsx           # Application entry point
│   └── index.css          # Application styles
│
├── .gitignore             # Files and folders to ignore in version control
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation (you are here)
```

---

## **Tech Stack**

- **Frontend:**

  - React.js
  - Tailwind CSS (for styling)
  - Vite (for fast development builds)
- **Backend/Data API:**

  - [Gutenberg Book API](https://gutendex.com/books/)
- **State Management:**

  - React hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`)
- **Storage:**

  - `localStorage` for persisting user preferences and wishlist data

---

## **Installation**

Follow the steps below to run the project locally:

### Prerequisites

Make sure you have the following tools installed:

- **Node.js** (version 14+): [Download Here](https://nodejs.org/)
- **npm** (comes bundled with Node.js) or **yarn**

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/hbkabir004/aungstrome-bookshop.git
   cd aungstrome-bookshop
   ```
2. **Install Dependencies**Use npm or yarn to install required packages.

   ```bash
   npm install
   # OR
   yarn install
   ```
3. **Run the Development Server**Start the local development server.

   ```bash
   npm run dev
   # OR
   yarn dev
   ```
4. **Open the Application in the Browser**
   Go to `http://localhost:5173` (if using Vite default port) to view the app.

---

## **Usage**

1. **Search for Books**

   - Use the search bar to find books by their title.
2. **Filter by Genre**

   - Use the dropdown filter to select a specific genre.
3. **Pagination**

   - Navigate between pages using the pagination component.
4. **Manage Wishlist**

   - Click the wishlist button on any book card to add or remove it from the wishlist.
   - The wishlist will persist even after refreshing the page.
5. **Persistent Preferences**

   - Search, filter, and pagination preferences will be saved automatically and restored on the next visit.

---


This README provides a complete overview of the project to help developers understand and contribute to the **Aungstrome Bookshop** repository.
