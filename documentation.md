# RPF App Documentation

Welcome to the RPF App documentation. This guide provides a comprehensive overview of the project, how to set it up locally, and how to use the Admin Panel. It is designed to help new developers or administrators understand the application quickly.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Local Development Setup](#local-development-setup)
4. [Database Configuration](#database-configuration)
5. [Admin Panel Guide](#admin-panel-guide)
   - [Accessing the Admin Panel](#accessing-the-admin-panel)
   - [Core Features](#core-features)
6. [Email Configuration](#email-configuration)
7. [Deployment](#deployment)

---

## Project Overview
The RPF App is a Next.js-based web application built for church administration and public-facing content. It features a public website and a secure Admin Panel for managing events, form submissions, FAQs, locations, user testimonies, and more. 

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, shadcn/ui components
- **Database & Auth:** Supabase (PostgreSQL, Supabase Auth)
- **Email:** Nodemailer (via Gmail SMTP)
- **Icons:** Lucide React
- **Text Editor:** React Quill

---

## Local Development Setup

To run this application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "RPF App"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following keys:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

   # Authentication Secret
   NEXTAUTH_SECRET=your-nextauth-secret-string

   # Gmail SMTP Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM_EMAIL=your-email@gmail.com

   # Application URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
   *(Note: Never commit your `.env.local` file to version control. The exact production keys are managed separately.)*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Configuration

The application uses **Supabase** (PostgreSQL) as its database.

**To initialize the database:**
1. Open your Supabase project dashboard.
2. Go to the **SQL Editor**.
3. Copy the contents of the `database-schema.sql` file located in the root directory.
4. Run the SQL script. This sets up all necessary tables (`users`, `events`, `event_registrations`, `resources`, `faqs`, `locations`, `page_images`, `form_submissions`).
5. **Storage:** In the Supabase dashboard, navigate to Storage and create a new public bucket named `RPF-images`. Set the policies to allow authenticated uploads.

---

## Admin Panel Guide

The Admin Panel provides a comprehensive interface for managing the app's content.

### Accessing the Admin Panel
- **URL Path:** `/admin`
- **Default Login:** 
  - **Email:** `admin@RPF.com`
  - **Password:** `admin123`
  *(Ensure you change this immediately after the first login)*

### Core Features

The admin navigation consists of the following sections:

1. **Dashboard (`/admin/dashboard`)**
   Provides an overview with high-level statistics and recent activity within the app.

2. **Events (`/admin/events`)**
   Create, edit, and delete church events. You can upload event flyers, set locations, dates, and times.

3. **Event Registrations (`/admin/registrations`)**
   View a list of users who have registered for specific events. Useful for headcounts and tracking attendance.

4. **FAQs (`/admin/faqs`)**
   Manage Frequently Asked Questions. FAQs are categorized by page (e.g., Youth, University, Fellowship, Children, General) to ensure they display correctly on the public site.

5. **Page Images (`/admin/images`)**
   Manage images used across various pages, such as homepage carousels or section banners.

6. **Locations (`/admin/locations`)**
   Add and manage church service locations. You can specify the service type, date/time, physical address, map links, and location images.

7. **Submissions (`/admin/submissions`)**
   A centralized hub for viewing forms submitted by users from the public site. Submissions are categorized into types:
   - Baptism
   - Counselling
   - Mentorship
   - Serve
   - Testimonies
   - Prayer
   - Children Registration

8. **Testimonials (`/admin/testimonials`)**
   Manage and approve testimonies submitted by church members before they appear on the public website.

9. **Resources (`/admin/resources`)**
   Upload and manage digital resources (links, files, documents) that users can access.

10. **Users (`/admin/users`)**
    Manage administrative access. You can add new Admin or Superadmin users.

11. **Privacy Policy (`/admin/privacy-policy`)**
    A rich-text editor to modify the public-facing Privacy Policy content directly from the dashboard.

12. **Settings & Profile (`/admin/settings`, `/admin/profile`)**
    Configure application-wide settings and manage your own active admin account details.

---

## Email Configuration
The system uses `nodemailer` configured with a Gmail App Password to handle outbound emails (e.g., form submission alerts or password resets). 
If emails are failing:
1. Ensure `SMTP_USER` and `SMTP_PASS` are correct.
2. The password must be a **16-character Google App Password** (not the standard login password). 
3. Check `EMAIL_AND_LOADER_SETUP.md` for more detailed SMTP troubleshooting.

## Deployment
This project is optimized for deployment on **Vercel**. When deploying:
1. Connect the GitHub repository to your Vercel project.
2. Add all environment variables from `.env.local` to the Vercel Environment Variables settings.
3. Trigger a deployment. Vercel will run `npm run build` and start the server automatically.
