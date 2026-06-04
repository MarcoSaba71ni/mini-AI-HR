# Mini AI HR Admin System

password for supabase: sita_dev_supabase
## 1. Project Overview

Mini AI HR is a full-stack HR administration application where an HR Admin can manage employee records using both a standard interface and an AI-powered chat prompt.

The HR Admin can type commands in natural language to perform employee management actions. For example:

> "Create an employee named John Doe as a Software Engineer in the Engineering department."

The application understands the request and creates the employee record.

---

## 2. Tech Stack

| Layer        | Technology                              |
|:-------------|:----------------------------------------|
| Frontend     | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Backend      | Next.js API Routes (App Router)         |
| Database     | Supabase PostgreSQL                     |
| Auth         | Supabase Auth                           |
| AI           | OpenAI API (GPT-4o with function calling) |
| Deployment   | Vercel                                  |
| Version Control | GitHub                               |

---

## 3. How to Run Locally

### Prerequisites
- Node.js 18+
- npm
- A Supabase project
- An OpenAI API key

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/mini-AI-HR.git
cd mini-AI-HR

# 2. Install dependencies
npm install

# 3. Copy the example environment file
cp .env.example .env.local

# 4. Fill in your environment variables (see section below)

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Required Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Project Settings → API** to find your URL and keys
3. Run the SQL schema from `supabase/schema.sql` in the **SQL Editor**
4. Enable **Email/Password** auth under **Authentication → Providers**
5. Create an HR Admin user under **Authentication → Users**

---

## 5. How the AI HR Assistant Works

The AI HR Assistant uses **OpenAI GPT-4o with function calling** to interpret natural language prompts and perform real database actions.

### Architecture

1. The HR Admin types a message in the chat interface
2. The message is sent to the `/api/ai/chat` route
3. The route calls OpenAI with a system prompt describing available HR functions and the current employee list
4. OpenAI decides which function to call (e.g. `create_employee`, `update_employee`) and returns structured arguments
5. The API route executes the corresponding Supabase database operation
6. The result is returned to the chat interface as a human-readable response

### Supported Functions

| Function | Description |
|:---------|:------------|
| `create_employee` | Creates a new employee record |
| `list_employees` | Retrieves employees with optional filters |
| `update_employee` | Updates fields on an existing employee |
| `deactivate_employee` | Sets an employee's status to inactive |
| `generate_summary` | Generates a professional HR summary for an employee |

---

## 6. Example Prompts

### Create Employee
```
Create an employee named John Doe. Email john@example.com. Job title Software Engineer.
Department Engineering. Employment type full time. Joining date 2026-06-01. Status active.
Manager Sarah Miller. Location: Stockholm.
```

### View Employees
```
Show me all active employees.
Show me all employees in the Engineering department.
List everyone who joined this year.
```

### Update Employee
```
Update John Doe's department to Product and job title to Product Engineer.
Change John Doe's work location to Berlin.
```

### Deactivate Employee
```
Deactivate John Doe.
Mark Jane Smith as inactive.
```

### Generate Summary
```
Generate an employee summary for John Doe.
Write a professional profile for Jane Smith.
```

---

## 7. Test Login Details

```
Email:    admin@miniai-hr.com
Password: Admin@12345
```

---

## 8. Expected Pages

| Page | Path |
|:-----|:-----|
| Login | `/login` |
| Dashboard | `/dashboard` |
| AI HR Assistant | `/assistant` |
| Employee List | `/employees` |
| Add Employee | `/employees/new` |
| Employee Profile | `/employees/[id]` |
| Edit Employee | `/employees/[id]/edit` |

---

## 9. Employee Record Fields

| Field | Type |
|:------|:-----|
| Full Name | Text |
| Email | Text |
| Phone Number | Text |
| Job Title | Text |
| Department | Text |
| Employment Type | full-time / part-time / contract |
| Joining Date | Date |
| Status | active / inactive |
| Manager Name | Text |
| Work Location | Text |
| Notes (optional) | Text |

---

## 10. Known Limitations

- Only one HR Admin role is supported; no multi-role system
- AI relies on employee names to find records — duplicate names may cause ambiguity
- Chat history is stored in-memory per session (not persisted to the database)
- OpenAI API calls are subject to rate limits and usage costs

---

## 11. Deployment

The app is deployed on **Vercel**. Connect the GitHub repository to a Vercel project and add the environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## 12. Contact

For questions regarding this project:

**Jagadeesh Varma**
Email: jagadeesh@sita.dev
Phone: +46730673649
