# FINAL ANTIGRAVITY WEBSITE GENERATION PROMPT

# Role #
You are an elite Principal Software Architect, Senior Product Designer, Staff Full-Stack Engineer, UI/UX Design Lead, and AI Systems Engineer.

Your task is to design and generate a **production-grade SaaS application** named **AttendAI** (working title), an AI-powered Smart Attendance & Workforce Intelligence Platform.

This is **NOT** a college CRUD project.

This must look and feel like a startup capable of serving thousands of organizations.

The application should be built with enterprise architecture, scalable design patterns, reusable components, and clean code.

---

# PROJECT OVERVIEW

## Product

AttendAI

## Industry

EdTech / HRTech / SaaS / AI

## Problem

Most attendance systems only record attendance.

They lack:

* automation
* analytics
* secure authentication
* workflow automation
* centralized reports
* role management
* scalable cloud architecture

Manual attendance wastes time and provides little insight.

---

## Solution

Build a cloud-native attendance intelligence platform that combines:

* Facial Recognition (future integration)
* Attendance Analytics
* Automated Reports
* Role Based Access
* Cloud Storage
* Workflow Automation
* AI-ready Architecture

The application must be designed so it can later integrate seamlessly with:

* AWS Rekognition
* n8n
* AI APIs
* Mobile Applications

without changing the architecture.

---

# CURRENT DEVELOPMENT PHASE

This prompt focuses ONLY on:

* Frontend
* Backend Architecture
* Database Design
* Authentication
* Authorization
* Dashboard
* File Storage
* API Structure

Do NOT implement facial recognition yet.

Instead create the architecture that will support it.

---

# FUTURE INTEGRATIONS (Architecture Ready)

The architecture MUST already support future integration with:

* AWS Rekognition
* AWS S3
* n8n
* AI Analytics
* AI Chat
* Notification Services
* Face Liveness Detection
* QR Attendance
* Mobile App

Design today for tomorrow.

---

# TECH STACK (MANDATORY)

Frontend

* Next.js (App Router)
* TypeScript
* TailwindCSS
* shadcn/ui
* Framer Motion
* React Hook Form
* Zod
* TanStack Query
* Lucide Icons

Backend

* Python
* Flask
* REST API Architecture
* JWT Verification
* Modular Service Layer

Database

* Supabase PostgreSQL

Authentication

* Supabase Authentication

Authorization

* Supabase Row Level Security (RLS)

Storage

* AWS S3

Workflow Automation

* n8n (architecture only for now)

Charts

* Recharts

State

* Zustand

Tables

* TanStack Table

Theme

* Dark + Light

Deployment Ready

---

# AUTHENTICATION

Authentication MUST use Supabase.

Support

* Email Login
* Email Signup
* Password Reset
* Email Verification
* Session Management

Future Ready

* Google Login
* Microsoft Login

Never implement custom authentication.

---

# AUTHORIZATION

Use Row Level Security.

Every organization must only access its own data.

Users can only access records belonging to their organization.

Role hierarchy

Super Admin

↓

Organization Admin

↓

Teacher / Manager

↓

Student / Employee

↓

Parent (future)

---

# DATABASE DESIGN

Design a normalized production schema.

Include tables such as:

organizations

users

roles

departments

courses

classes

subjects

students

teachers

attendance

attendance_sessions

leave_requests

notifications

reports

audit_logs

workflow_logs

face_profiles

storage_files

settings

Every table should include:

UUID

created_at

updated_at

organization_id

soft delete support

Indexes where required

Future-proof relationships.

---

# BACKEND ARCHITECTURE

Use modular Flask architecture.

Example

app/

routes/

services/

models/

middleware/

utils/

schemas/

config/

storage/

auth/

Do NOT write everything inside app.py.

---

# API DESIGN

RESTful APIs.

Examples

Authentication

Organization

Students

Teachers

Attendance

Reports

Notifications

Settings

Dashboard

Analytics

Storage

All APIs should return standardized JSON.

Validation required.

Error handling required.

---

# AWS S3

Files to support

Student Images

Teacher Images

Reports

Exports

Documents

Certificates

Future

Attendance Snapshots

Videos

Never store files inside database.

Only metadata.

---

# N8N (ARCHITECTURE ONLY)

Do NOT fully implement.

Prepare webhook architecture.

Example future workflows

Attendance Recorded

↓

Update Dashboard

↓

Generate Audit Log

↓

Send Notification

↓

Generate Report

↓

AI Analysis

Keep backend ready for webhook triggers.

---

# APPLICATION MODULES

## Public Website

Landing Page

About

Features

Pricing

FAQ

Contact

Login

Register Organization

---

## Admin Portal

Dashboard

Organizations

Departments

Teachers

Students

Attendance

Analytics

Reports

Notifications

Workflow Center

Audit Logs

Settings

Profile

---

## Teacher Portal

Dashboard

Classes

Attendance

Students

Reports

Leave Requests

Profile

---

## Student Portal

Dashboard

Attendance

Leave

Reports

Notifications

Profile

---

# PAGE STRUCTURE

Landing Page

Authentication

Organization Setup Wizard

Admin Dashboard

Teacher Dashboard

Student Dashboard

Student Management

Teacher Management

Attendance Center

Analytics

Reports

Notifications

Workflow Center

Audit Logs

Settings

User Profile

404

403

500

Loading States

Empty States

---

# LANDING PAGE

Build an award-winning modern SaaS landing page.

Sections

Hero

Trusted By

Features

Platform Overview

How It Works

Architecture

Security

Analytics Preview

Workflow Preview

Pricing

Testimonials

FAQ

CTA

Footer

The landing page should resemble premium SaaS products.

Not educational websites.

---

# DASHBOARD

Dashboard must include

Today's Attendance

Present

Absent

Late

Average Attendance

Weekly Trend

Monthly Trend

Department Comparison

Quick Actions

Recent Activities

Notifications

Upcoming Classes

Charts

Tables

Search

Filters

Responsive Cards

---

# ATTENDANCE MODULE

For now

Manual Attendance

Attendance Table

Attendance History

Attendance Session

Attendance Logs

Export CSV

Export PDF

Future placeholders

Face Recognition

Live Camera

QR Mode

AI Verification

---

# ANALYTICS

Charts

Attendance Trend

Department Comparison

Monthly Attendance

Weekly Attendance

Late Arrivals

Attendance Percentage

Risk Students

Future AI Insights placeholder

---

# REPORTS

Daily

Weekly

Monthly

Semester

Department

Class

Export

CSV

PDF

Excel

Store generated reports inside S3.

---

# UI/UX REQUIREMENTS

Create an enterprise SaaS dashboard.

Modern.

Minimal.

Elegant.

Professional.

Inspired by

Linear

Stripe

Vercel

Notion

Clerk

Supabase Dashboard

Avoid glassmorphism overload.

Use clean spacing.

Grid system.

Large whitespace.

Rounded corners.

Professional typography.

Excellent visual hierarchy.

Responsive from 320px to 4K.

Dark Mode.

Light Mode.

Command Palette.

Global Search.

Breadcrumbs.

Animated page transitions.

Skeleton Loading.

Empty States.

Toast Notifications.

Accessibility.

Keyboard Navigation.

WCAG Friendly.

---

# DESIGN SYSTEM

Create reusable

Buttons

Inputs

Tables

Cards

Dialogs

Drawers

Dropdowns

Date Pickers

Charts

Badges

Alerts

Forms

Pagination

Tabs

Sidebar

Navbar

Stats Cards

Everything componentized.

---

# SECURITY

JWT Verification

Protected Routes

Role Based Access

Server Validation

Input Validation

SQL Injection Protection

Secure File Uploads

Environment Variables

No secrets in frontend.

---

# PERFORMANCE

Lazy Loading

Code Splitting

Image Optimization

Server Components where appropriate

Caching Strategy

Pagination

Optimized Queries

Reusable Hooks

Reusable Components

---

# RESPONSIVENESS

Desktop

Laptop

Tablet

Mobile

Everything must be fully responsive.

No broken layouts.

---

# CODE QUALITY

Strict TypeScript

Reusable Components

Clean Folder Structure

SOLID Principles

Production Ready

No duplicated logic.

No inline business logic.

Maintainable architecture.

---

# OUTPUT EXPECTATIONS

Generate:

* Complete frontend architecture
* Complete backend architecture
* Production folder structure
* API architecture
* Database schema
* Authentication flow
* Authorization strategy
* Dashboard pages
* Landing page
* Component hierarchy
* Navigation
* Forms
* Tables
* Charts
* Reusable UI system
* Backend endpoints
* Storage integration architecture
* n8n integration points
* S3 upload architecture
* Supabase integration
* Environment configuration
* Documentation comments where appropriate

The codebase should be scalable enough to support future integration of AWS Rekognition, AI services, and n8n workflows without major refactoring.

---

# IMPORTANT

I will provide **frontend inspiration/reference images** after this prompt. Analyze those references carefully and adapt the visual design, layout, spacing, typography, animations, and interaction patterns while preserving the functional requirements above. Do not copy designs directly; instead, create an original, production-quality interface inspired by the provided references.

Do **not** implement AWS Rekognition logic yet. Instead, ensure the architecture, database, APIs, and UI include clear extension points so facial recognition, liveness detection, and workflow automation can be integrated incrementally as the project evolves.
