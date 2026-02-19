-- ============================================
-- Dummy Data for Portfolio
-- Run this in Supabase SQL Editor AFTER the schema
-- ============================================

-- Dummy Projects
INSERT INTO projects (title, description, tech_stack, live_url, repo_url, sort_order) VALUES
(
  'E-Commerce Platform',
  'A full-stack e-commerce platform with real-time inventory management, payment integration, and admin dashboard for managing products and orders.',
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
  'https://example-shop.vercel.app',
  'https://github.com/username/ecommerce-platform',
  1
),
(
  'Task Management App',
  'A collaborative task management application with drag-and-drop kanban boards, real-time updates, and team collaboration features.',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Docker'],
  'https://taskify-demo.vercel.app',
  'https://github.com/username/taskify',
  2
),
(
  'Weather Dashboard',
  'A beautiful weather dashboard that displays real-time weather data, forecasts, and interactive maps using multiple weather APIs.',
  ARRAY['Vue.js', 'Python', 'FastAPI', 'Redis', 'Chart.js'],
  'https://weather-dash.vercel.app',
  'https://github.com/username/weather-dashboard',
  3
),
(
  'AI Chat Assistant',
  'An intelligent chatbot built with GPT-4 API that can answer questions, write code, and help with various tasks. Features conversation history and context awareness.',
  ARRAY['Next.js', 'OpenAI API', 'Supabase', 'Vercel AI SDK'],
  'https://ai-chat-demo.vercel.app',
  'https://github.com/username/ai-chat',
  4
);

-- Dummy Articles
INSERT INTO articles (title, slug, excerpt, content, tags, published, created_at) VALUES
(
  'Building a Modern Portfolio with Next.js and Supabase',
  'building-modern-portfolio-nextjs-supabase',
  'Learn how to create a stunning portfolio website using Next.js 16, Supabase for data management, and shadcn/ui for beautiful components.',
  '## Introduction

In this article, we''ll walk through building a modern portfolio website from scratch using Next.js 16, Supabase, and shadcn/ui.

## Why This Stack?

**Next.js 16** provides an excellent developer experience with:
- App Router for intuitive file-based routing
- Server Components for fast initial page loads
- Built-in image optimization

**Supabase** gives us:
- PostgreSQL database with a great dashboard
- Authentication out of the box
- Row Level Security for data protection

**shadcn/ui** offers:
- Beautiful, accessible components
- Full customization with Tailwind CSS
- Copy-paste approach (no lock-in)

## Getting Started

First, create a new Next.js project:

```bash
npx create-next-app@latest my-portfolio
```

Then install the dependencies:

```bash
npm install @supabase/supabase-js @supabase/ssr
npx shadcn@latest init
```

## Database Schema

We need three main tables:
- **profiles** - Your personal information
- **projects** - Portfolio projects
- **articles** - Blog posts

## Building the Landing Page

The landing page is a simple profile card that displays your information.

## Conclusion

With this stack, you get a performant, type-safe portfolio that''s easy to manage through a custom dashboard.',
  ARRAY['Next.js', 'Supabase', 'Tutorial', 'Web Development'],
  true,
  NOW() - INTERVAL '3 days'
),
(
  'Understanding TypeScript Generics',
  'understanding-typescript-generics',
  'A deep dive into TypeScript generics with practical examples and best practices for building type-safe applications.',
  '## What Are Generics?

Generics allow you to write flexible, reusable code while maintaining type safety. Think of them as **type parameters** for your functions, classes, and interfaces.

## Basic Syntax

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello"); // type is string
const num = identity(42); // type is inferred as number
```

## Generic Constraints

You can constrain generics to only accept certain types:

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // OK
logLength([1, 2, 3]); // OK
logLength(42); // Error: number doesn''t have length
```

## Generic Interfaces

```typescript
interface Repository<T> {
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
```

## Real-World Example: API Client

```typescript
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<T>;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const user = await fetchData<User>("/api/users/1");
```

## Conclusion

Generics are one of TypeScript''s most powerful features. Master them and you''ll write more flexible, reusable, and type-safe code.',
  ARRAY['TypeScript', 'JavaScript', 'Tutorial'],
  true,
  NOW() - INTERVAL '7 days'
),
(
  'The Art of Clean Code: Practical Tips',
  'art-of-clean-code-practical-tips',
  'Practical tips and principles for writing clean, maintainable code that your future self and teammates will thank you for.',
  '## Why Clean Code Matters

Clean code isn''t about following rigid rules — it''s about **communication**. Code is read far more often than it''s written.

## Naming Conventions

Bad:
```typescript
const d = new Date();
const fn = (a: number, b: number) => a + b;
```

Good:
```typescript
const currentDate = new Date();
const calculateTotal = (price: number, tax: number) => price + tax;
```

## Functions Should Do One Thing

Each function should have a single responsibility:

```typescript
// Bad: does too many things
function processUser(user: User) {
  validateUser(user);
  saveToDatabase(user);
  sendEmail(user);
  logActivity(user);
}

// Good: each function does one thing
function validateUser(user: User): ValidationResult { ... }
function saveUser(user: User): Promise<User> { ... }
function sendWelcomeEmail(user: User): Promise<void> { ... }
```

## Keep It Simple

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler

## Conclusion

Clean code is a practice, not a destination. Continuously refactor and improve.',
  ARRAY['Clean Code', 'Best Practices', 'Software Engineering'],
  true,
  NOW() - INTERVAL '14 days'
);
