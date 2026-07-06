# AttendAI — AI-Powered Smart Attendance & Workforce Intelligence

AttendAI is a production-grade multi-tenant SaaS application designed to manage organizational workforce attendance, trace real-time indicators, and automate communication channels.

---

## 🛠️ Architecture & Technology Stack

The platform is designed around a three-tier architecture:

1. **Frontend Portal (Next.js 14 App Router)**
   - Single-Page dashboard framework using dynamic HSL Tailwind CSS variables.
   - Animated interactions powered by **Framer Motion**.
   - Client state orchestration using persistent **Zustand** stores.
   - Visualized metrics representation using **Recharts**.

2. **Server API Layer (Python Flask)**
   - Decoupled REST controllers with standard response envelopes.
   - Custom decorator authorization gates decoding **Supabase JWTs**.
   - Secure integrations with **AWS S3** client nodes dispatching presigned upload tokens.
   - Automation bridges sending payload events to **n8n workflows**.

3. **Cloud Database (Supabase PostgreSQL)**
   - Relational schema structure holding profiles, courses, schedules, and leaves.
   - Custom database indexes enforcing lookup performance metrics.
   - Multi-tenant isolation guarded by Postgres **Row-Level Security (RLS)**.

---

## 📂 Project Structure

```
attendence/
├── attendai/                    # NEXT.JS FRONTEND
│   ├── src/
│   │   ├── app/                 # Routes: admin, teacher, student portals, auth, landing
│   │   ├── components/          # Reusable layouts, sidebars, charts, badges
│   │   ├── lib/                 # Mock data, supabase client configurations
│   │   ├── store/               # Zustand auth, UI, notification states
│   │   └── types/               # Normalized TypeScript interfaces
│   └── tailwind.config.ts
│
├── backend/                     # FLASK API GATEWAY
│   ├── app/
│   │   ├── auth/                # Supabase JWT key decoder
│   │   ├── config/              # settings.py variables validator
│   │   ├── middleware/          # Flask g request contexts gate decorators
│   │   ├── routes/              # Modular controller endpoints blueprints
│   │   └── utils/               # envelope format standardizers
│   ├── run.py
│   └── requirements.txt
│
└── database/
    └── schema.sql               # Supabase database creation DDL script
```

---

## ⚙️ Development Environment Setup

### 1. Database Setup
1. Open your project dashboard in **Supabase**.
2. Navigate to the **SQL Editor** tab.
3. Open a new query editor tab, paste the contents of `database/schema.sql`, and execute it.
4. Make sure that Row Level Security (RLS) is active on the created tables.

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Linux/macOS:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy the environment variables example:
   ```bash
   cp .env.example .env
   ```
5. Modify the created `.env` file to match your Supabase API credentials, AWS S3 keys, and n8n webhook targets.
6. Start the development server:
   ```bash
   python run.py
   ```

### 3. Frontend Setup
1. Navigate to the `attendai` directory:
   ```bash
   cd attendai
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Copy environment settings file:
   ```bash
   cp .env.local.example .env.local
   ```
4. Configure your `.env.local` with Supabase project credentials.
5. Launch the local dev compiler:
   ```bash
   npm run dev
   ```
6. Open your web browser at `http://localhost:3000`.

---

## 🔒 Multi-Tenant Role Operations

AttendAI supports 3 distinct authenticated portals depending on user claims:

- **Organization Admins (`/admin`)**: Fully configure academic departments, crud students/teachers directories, review audit logs, toggle integrations, and generate compiled reports.
- **Teaching Faculty (`/teacher`)**: View daily teaching schedules, submit session roll call sheets, and authorize/reject student leave application tokens.
- **Enrolled Students (`/student`)**: Heatmap metrics display tracking presence averages, and submit leave requests.
