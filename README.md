# CITY EXPLOR

City Explor is a modern, frontend-focused web application built with React.js that allows users to explore cities, places, and related content through a clean, responsive UI and a powerful role-based dashboard.

The project uses JSON Server as a mock backend, simulating real-world REST APIs for learning, development, and frontend architecture practice.

    ⚠️ Note: This project does not include a real backend. All data operations are handled via JSON Server.

![React](https://img.shields.io/badge/React-19-%2361DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-%646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-%2338B2AC?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![JSON Server](https://img.shields.io/badge/JSON%20Server-Mock%20API-orange)
![Status](https://img.shields.io/badge/Status-Completed-success)

## 🚀 Live Overview

🌐 Explore places, cities, and blogs

🔐 Role-based dashboard (Admin / Owner / User)

📊 Full CRUD operations

📱 Responsive & mobile-first design

⚡ Smooth UI interactions

## Technologies Used

![React](https://img.shields.io/badge/React.js-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwindcss)
![JSON Server](https://img.shields.io/badge/JSON--Server-Mock%20Backend-orange?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Only-blueviolet?style=for-the-badge)

React.js

Tailwind CSS

JavaScript (ES6+)

JSON Server (Mock Backend)

REST API Simulation

React Router DOM

React Icons

Framer Motion

React Toastify

Context API

Custom Hooks

# Pages & Features

![Role Based Auth](https://img.shields.io/badge/Auth-Role%20Based-informational)
![CRUD](https://img.shields.io/badge/CRUD-Full-success)
![Custom Hooks](https://img.shields.io/badge/React-Custom%20Hooks-lightblue)
![Responsive](https://img.shields.io/badge/UI-Responsive-success)
![Charts](https://img.shields.io/badge/Recharts-Data%20Viz-blue)
![Maps](https://img.shields.io/badge/Leaflet-Maps-green)
![Slider](https://img.shields.io/badge/Swiper-Slider-blueviolet)

## Public Pages

Home

Places

Blog

About

Contact

Login

Register

Reset Password

404 – Not Found

## Dashboard (Role-Based Access)

Dashboard Overview

Users Management

Places Management

Cities Management

Categories Management

Countries Management

Settings

### 🔐 Access Control:

    Dashboard access is controlled using role-based authorization, simulated through JSON Server.

    Admin: Full access

    Owner: Manage own places

    User: Limited access

### Project Folder Structure

    src/

    │
    ├── components/ # Reusable UI components
    ├── pages/ # Application pages
    ├── hooks/ # Custom React hooks (API & logic)
    ├── context/ # Global state (Auth, Theme)
    ├── services/ # JSON Server API handlers
    ├── routes/ # Public & protected routes
    ├── assets/ # Images & icons
    ├── utils/ # Helper functions
    ├── api/ # API base configuration
    │
    ├── App.jsx
    └── main.jsx

## Project Timeline

Start Date: October 2025

End Date: January 25, 2026

## Core Concepts & Techniques

![React](https://img.shields.io/badge/React.js-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwindcss)
![JSON Server](https://img.shields.io/badge/JSON--Server-Mock%20Backend-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge)

Context API (Authentication & Theme)

Custom Hooks for API abstraction

JSON Server as a mock REST API

Component-based architecture

Role-based authentication (simulated)

Protected routes

Search & filtering

Responsive UI (mobile-first)

CRUD operations (Create, Read, Update, Delete)

Loading & error state handling

### Custom Hooks Example

The project heavily relies on custom hooks to keep components clean and reusable:

    export const usePlaces = () => {
    const { data = [], error, loading, refetch } = useFetch(`${ApiUrl}/places`);
    return {
        places: data,
        hasPlace: data.length > 0,
        error,
        loading,
        refetch,
    };
    };

✔️ Centralized API logic
✔️ Clean UI components
✔️ Scalable architecture

## 🧩 Challenges Faced

Simulating authentication without a real backend

Role-based authorization using mock data

Managing shared state across the dashboard

Designing reusable, scalable components

Handling async API states (loading, errors)

Structuring a large React project cleanly

## 📚 Learning Outcomes

Building real-world dashboards with React

Working with mock APIs (JSON Server)

Advanced state management using Context API

Writing clean and reusable custom hooks

Creating responsive UIs with Tailwind CSS

Structuring scalable frontend applications

Writing scalable and maintainable frontend code

## Install dependencies

    npm install

## Run JSON Server

    npm run jsonserver

## Start React app

    npm run dev

# Author

Mohammad Juma Qasimi
Frontend Developer | React.js

Passionate about clean UI/UX

Focused on scalable frontend architecture

Always learning & improving 🚀
