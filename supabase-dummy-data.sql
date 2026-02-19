-- Insert Dummy Projects
INSERT INTO projects (title, description, slug, image_url, tech_stack, live_url, repo_url, sort_order, content)
VALUES
(
    'E-Commerce Dashboard',
    'A comprehensive analytics dashboard for online retailers. Features real-time sales tracking, inventory management, and customer insights.',
    'ecommerce-dashboard',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', -- Data Visualization / Dashboard
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Supabase'],
    'https://demo-ecommerce-dashboard.vercel.app',
    'https://github.com/bozid95/simplify-porto',
    1,
    '# E-Commerce Dashboard

## Overview
This project was built to help small to medium-sized businesses track their online sales in real-time. It replaces manual spreadsheet tracking with a live, interactive dashboard.

## Key Features
- **Real-time Analytics:** WebSocket integration for live order updates.
- **Inventory Management:** Automatic low-stock alerts.
- **Customer Insights:** Cohort analysis and lifetime value calculation.

## Tech Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS for styling.
- **Charts:** Recharts for performant and responsive data visualization.
- **Backend:** Supabase (PostgreSQL) for database and authentication.

## Challenges
One of the main challenges was optimizing the loading speed of large datasets. We implemented server-side pagination and aggressive caching to ensure the dashboard loads in under 1 second even with 10,000+ records.
'
),
(
    'TaskMaster Pro',
    'A collaborative project management tool designed for remote teams. Includes kanban boards, real-time chat, and file sharing.',
    'taskmaster-pro',
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop', -- Productivity / Kanban
    ARRAY['React', 'Redux', 'Node.js', 'Socket.io', 'MongoDB'],
    'https://taskmaster-pro-demo.herokuapp.com',
    'https://github.com/bozid95/simplify-porto',
    2,
    '# TaskMaster Pro

## The Goal
Remote work can be chaotic. TaskMaster Pro aims to bring order to the chaos by unifying task management and communication in a single platform.

## Architecture
The application follows a microservices architecture to handle the distinct loads of real-time chat versus standard REST API requests.

### Core Services
1.  **Auth Service:** JWT-based authentication.
2.  **Task Service:** CRUD operations for tasks and boards.
3.  **Chat Service:** Socket.io server for real-time messaging.

## UI/UX Design
We focused heavily on a "drag-and-drop first" experience. The Kanban board is fully accessible and supports keyboard navigation.
'
),
(
    'Zenith Fitness App',
    'A mobile-first web application for tracking workouts and nutrition. Gamifies the fitness journey with achievements and social goals.',
    'zenith-fitness',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop', -- Fitness / Gym
    ARRAY['Vue.js', 'Firebase', 'PWA', 'Chart.js'],
    'https://zenith-fitness.netlify.app',
    'https://github.com/bozid95/simplify-porto',
    3,
    '# Zenith Fitness App

## Concept
Fitness apps are often too complex. Zenith takes a minimalist approach: log your workout in 3 taps or less.

## PWA Features
This app is a Progressive Web App (PWA), meaning it:
- Works offline.
- Can be installed on the home screen.
- Sends push notifications for workout reminders.

## Impact
Since launch, users have logged over **50,000 workouts**. The "Streaks" feature increased daily retention by 40%.
'
);
