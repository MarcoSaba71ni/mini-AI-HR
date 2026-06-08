# Mini AI HR System

🔐 **Supabase password:** sita_dev_supabase

## What's this about?

Mini AI HR is basically an HR management tool with a twist — you can manage employees the normal way (clicking buttons, filling forms), or you can just chat with an AI and tell it what you want. "Add John as an engineer" and boom, employee created. It's like having an HR assistant you can talk to.

The whole thing runs on Next.js with Supabase for data and OpenAI for the AI part.

## Tech Stack

- **Frontend:** Next.js 15 + React 19 + TypeScript + Tailwind
- **Backend:** Next.js API Routes  
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (email/password)
- **AI:** OpenAI GPT-4o with function calling
- **Deployment:** Vercel

## Getting Started

### What you need
- Node.js 18+
- npm
- A Supabase account (free tier works)
- OpenAI API key

### Setup

```bash
# Clone it
git clone https://github.com/your-username/mini-AI-HR.git
cd mini-AI-HR

# Install dependencies
npm install

# Copy env template
cp .env.example .env.local

# Add your API keys to .env.local (see below)

# Run it locally
npm run dev
```

Visit http://localhost:3000 and you're good to go.

### Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
```

Get these from:
- **Supabase:** Project Settings → API
- **OpenAI:** API keys page

### Supabase Setup

1. Create a new project at supabase.com
2. In SQL Editor, run the schema from `supabase/schema.sql`
3. Go to Authentication → Providers and enable Email/Password
4. **Important:** Disable "Confirm email" (unless you want email verification)
5. Create a test user in Authentication → Users

## How the AI Assistant Works

When you type something in the chat, here's what happens:

1. Your message goes to `/api/ai/chat`
2. OpenAI gets the message + a list of what it can do (create employee, update, etc.)
3. OpenAI decides what function to call and sends back the parameters
4. The API executes it in the database
5. The result comes back as a readable message in the chat

Think of it like telling someone what you want, and they handle the details.

### Things it can do

- `create_employee` - Add a new employee
- `list_employees` - See employees (can filter)
- `update_employee` - Change employee info
- `deactivate_employee` - Mark someone as inactive
- `generate_summary` - Write a professional summary for an employee

## Pages in the App

| Page | URL | What it does |
|------|-----|------|
| Home | `/` | Landing page (redirects to dashboard if you're logged in) |
| Login | `/login` | Sign in with email/password |
| Register | `/register` | Create a new account |
| Dashboard | `/dashboard` | Shows employee stats and quick actions |
| Employees | `/employees` | List of all employees |
| Create Employee | `/create-employee` | Add a new employee (form or AI) |
| Edit Employee | `/edit-employee/[id]` | Update an employee's info |
| AI Assistant | `/ai-assistant` | Chat with the AI to manage employees |

## Try these prompts in the AI chat

```
Create an employee named John Doe, software engineer, engineering dept, joins 2026-06-01
```

```
Show me all active employees in the engineering department
```

```
Update John Doe - change department to Product and title to Senior Engineer
```

```
Deactivate John Doe
```

```
Generate a professional summary for Jane Smith
```

## Test Account

```
Email: admin@miniai-hr.com
Password: Admin@12345
```

## Employee Info You Can Store

- Full name
- Email
- Phone
- Job title
- Department
- Employment type (full-time, part-time, contract)
- Joining date
- Status (active/inactive)
- Manager name
- Work location
- Notes

## Known Issues & Limitations

- Only one admin role — no role system yet
- AI matches employees by name, so duplicate names might confuse it
- Chat history only stays for your current session (not saved)
- OpenAI calls cost money and have rate limits

## Deploy It

Push to GitHub, connect to Vercel, add your env vars in Vercel settings, and you're done.

## Questions?

Reach out to Jagadeesh:
- Email: jagadeesh@sita.dev
- Phone: +46730673649
