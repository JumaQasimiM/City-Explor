# CITY EXPLOR

City Explor is a modern, frontend-focused web application built with React.js that allows users to explore cities, places, and related content through a clean, responsive UI and a powerful role-based dashboard.

The project uses JSON Server as a mock backend, simulating real-world REST APIs for learning, development, and frontend architecture practice.

> ⚠️ Note: This project does not include a real backend. All data operations are handled via JSON Server.

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

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![JavaScript ES6](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![REST API](https://img.shields.io/badge/API-RESTful-blue)
![React Router](https://img.shields.io/badge/React_Router_DOM-7-CA4245?logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss&logoColor=white)
![React Icons](https://img.shields.io/badge/React_Icons-Icons-purple)
![React Toastify](https://img.shields.io/badge/Toast-React--Toastify-orange)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-0055FF?logo=framer)
![Custom Hooks](https://img.shields.io/badge/React-Custom_Hooks-lightblue)

<p align="left"> <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" /> <img alt="Tailwind CSS" src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss&logoColor=white" /> <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" /> <img alt="JSON Server" src="https://img.shields.io/badge/JSON_Server-Mock_Backend-lightgrey" /> <img alt="REST API" src="https://img.shields.io/badge/API-RESTful-blue" /> <img alt="React Router" src="https://img.shields.io/badge/React_Router_DOM-7-CA4245?logo=reactrouter&logoColor=white" /> <img alt="React Icons" src="https://img.shields.io/badge/React_Icons-Icons-purple" /> <img alt="Framer Motion" src="https://img.shields.io/badge/Framer_Motion-Animations-0055FF?logo=framer" /> <img alt="React Toastify" src="https://img.shields.io/badge/Toast-React--Toastify-orange" /> <img alt="Context API" src="https://img.shields.io/badge/Context_API-State-lightblue" /> <img alt="Custom Hooks" src="https://img.shields.io/badge/Custom_Hooks-React-lightblue" /> </p>

# Pages & Features

## Public Pages

<p align="left"> <img alt="Home" src="https://img.shields.io/badge/Home-Page-blue?style=for-the-badge" /> <img alt="Places" src="https://img.shields.io/badge/Places-Page-teal?style=for-the-badge" /> <img alt="Blog" src="https://img.shields.io/badge/Blog-Page-purple?style=for-the-badge" /> <img alt="About" src="https://img.shields.io/badge/About-Page-orange?style=for-the-badge" /> <img alt="Contact" src="https://img.shields.io/badge/Contact-Page-red?style=for-the-badge" /> <img alt="Login" src="https://img.shields.io/badge/Login-Page-green?style=for-the-badge" /> <img alt="Register" src="https://img.shields.io/badge/Register-Page-pink?style=for-the-badge" /> <img alt="Reset Password" src="https://img.shields.io/badge/Reset_Password-Page-lightgrey?style=for-the-badge" /> <img alt="404 Not Found" src="https://img.shields.io/badge/404-Not_Found-red?style=for-the-badge" /> </p>

## Dashboard (Role-Based Access)

<p align="left"> <img alt="Dashboard Overview" src="https://img.shields.io/badge/Dashboard-Overview-blue?style=for-the-badge" /> <img alt="Users Management" src="https://img.shields.io/badge/Users-Management-teal?style=for-the-badge" /> <img alt="Places Management" src="https://img.shields.io/badge/Places-Management-purple?style=for-the-badge" /> <img alt="Cities Management" src="https://img.shields.io/badge/Cities-Management-orange?style=for-the-badge" /> <img alt="Categories Management" src="https://img.shields.io/badge/Categories-Management-red?style=for-the-badge" /> <img alt="Countries Management" src="https://img.shields.io/badge/Countries-Management-green?style=for-the-badge" /> <img alt="Settings" src="https://img.shields.io/badge/Settings-Page-lightgrey?style=for-the-badge" /> </p>

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

    > export const usePlaces = () => {
    > const { data = [], error, loading, refetch } = useFetch(`${ApiUrl}/places`);
    > return {
    >     places: data,
    >     hasPlace: data.length > 0,
    >     error,
    >     loading,
    >     refetch,
    > };
    > };

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

## Author

**Mohammad Juma Qasimi**  
Frontend Developer | React.js

> Building modern, scalable, and user-friendly web interfaces.

- Clean UI / UX
- Scalable frontend architecture
- Continuous learning mindset
