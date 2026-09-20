# IT Service Ticketing System

A simple, robust, production-ready web application designed for independent IT technicians and small service businesses to manage customer service requests.

Built with Next.js 15, React 19, Tailwind CSS 4, and Supabase.

## Features

- **Customer Portal**:
  - Clean, accessible landing page.
  - Comprehensive Service Request form.
  - Automatic ticket number generation (e.g., `IT-2026-000001`).
  - Self-service ticket tracking using ticket number and mobile number.
- **Technician Admin Dashboard**:
  - Secure email/password login.
  - Overview statistics (New requests, In-progress, Resolved).
  - Detailed ticket management (update status, add notes).
  - Customer database view.
  - Settings page.
- **Database Architecture (Supabase PostgreSQL)**:
  - Robust Row Level Security (RLS) policies.
  - Automatic timestamp triggers (`updated_at`).
  - Server actions bypassing RLS securely using a Service Role Admin Client.
- **Modern Styling**:
  - Tailwind CSS v4 (CSS-first configuration).
  - Fully responsive UI.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/ticketing-system.git
    cd ticketing-system
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Supabase Setup:**
    - Create a new project in Supabase.
    - Go to the SQL Editor and run the migration script located at `supabase/migrations/20260919000001_init_ticketing_system.sql`.
    - Run the seed script located at `supabase/seed.sql` to create your initial admin user. **IMPORTANT:** Change the default email and password in this script before running it in production!

4.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    ```

    _You can find these in your Supabase project under Settings > API._

5.  **Configuration:**
    Open `lib/config/technician.ts` and update your business details (Name, Company, Contact info, Socials). This configuration drives the UI across the app.

6.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) to your Vercel project settings.
4.  Deploy!

## License

This project is licensed under the MIT License.
