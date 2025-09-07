# React + TypeScript + Vite Project For Da Vinci

## Project Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy Link on Vercel

https://for-da-vinci-git-feat-user-hook-ismailuras09gmailcoms-projects.vercel.app

## Overview

This project was built as part of a web development assignment. It demonstrates a basic frontend implementation using React, TypeScript, and Vite, with data fetched from JSONPlaceholder.

The application provides:
- A homepage with navigation to Users and Posts
- CRUD operations on both Users and Posts
- Post filtering with userId field.
- Responsive UI styled with TailwindCSS

### API Limitations

Since the API is fake, some operations have limitations:
- Newly created items do not persist with unique IDs (e.g., duplicate IDs on create may cause conflicts when updating or deleting)
- Updating non-persistent items is not possible

## Features

- User list with CRUD operations
- Post list with CRUD operations
- Responsive design
- Custom hooks for reusability
- Type safety with TypeScript
- Linting with ESLint

## Libraries and Tools Used

- **React Hook Form** – form submission and validation
- **Axios** – API requests
- **React Hot Toast** – toast notifications
- **React Intersection Observer** – rendering optimization for post lists
- **React Modal & React Popper** – modals and popovers
- **TailwindCSS** – responsive styling
- **ESLint + TypeScript ESLint** – linting and type checking

## Notes

- No external state management library was used since the project scope was small
- A custom hook was created for user-related logic to encourage reusability and cleaner code
- Focus was placed on responsiveness, performance, and maintaining type safety

## Tech Stack

- React 
- TypeScript
- Vite
- TailwindCSS
- JSONPlaceholder API
