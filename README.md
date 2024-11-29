This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# RECIPE MASTER

## Introduction
Welcome to the Recipe Master project! This is a web application built with Next.js, a powerful React framework for building server-side rendered and statically generated web applications. The project was bootstrapped with create-next-app, providing a solid foundation for developing modern web applications.

### Features
#### User Authentication: Secure user authentication using Google OAuth.
#### Recipe Management: Create, read, update, and delete recipes with ease.
#### Image Upload: Upload and manage images for your recipes.
#### Responsive Design: Optimized for both desktop and mobile devices.
#### Database Integration: Uses PostgreSQL for data storage, managed with Prisma ORM.
#### Technologies Used
###### Next.js: Framework for server-side rendering and static site generation.
###### React: JavaScript library for building user interfaces.
###### Prisma: Next-generation ORM for database management.
###### Tailwind CSS: Utility-first CSS framework for styling.
###### Google OAuth: Authentication provider for secure user login.
###### Bun: Fast JavaScript runtime for installing dependencies and running scripts.

## Getting Started

### Step 1: Install Dependencies

First, install the project dependencies:

```bash
bun install
```

### Step 2: Configure Environment Variables

Create a .env.local file in the root of your project and add your own values for the following variables:

AUTH_SECRET="your_auth_secret"
AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"
DATABASE_URL="your_database_url"
#DATABASE_URL_UNPOOLED="your_unpooled_database_url" //if you are using NeonDB or similar solution

### Step 3: Run Prisma Migrations and Generate Commands

Run the following commands to set up your database schema:


```bash
bunx prisma migrate dev --name init
bunx prisma generate
```

bunx prisma generate

### Step 4: Run the Development Server

Finally, start the development server:


```bash
bun next dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Project Structure ->
app/: Contains the main application code.
app/api/: backend api routes
hooks/: Reusable hooks
lib:/: usefull ultilties
prisma/: schema and configuration of prisma
types/: common types
components/: Reusable UI components.
schema:/ react-hook-form schema for form validation
public:/ static files

## Hosted Website

You can view the hosted app @ [Recipe-Master.KhaledHm.tn](https://recipe-master.khaledhm.tn).
![image](https://github.com/user-attachments/assets/7317ef8c-1b5c-4333-a111-30dd238da352)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
