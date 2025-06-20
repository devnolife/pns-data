# 📘 Public Service Digital Report Management System - Feature Overview

This document outlines the **feature specifications** as represented in the system flowchart. It helps engineers, QA, and contributors understand the key components and access rules of the application.

---

## 🔐 User Roles & Authentication
- **Login** via form authentication.
- Users are redirected to dashboards based on their role:
  - `ADMIN`
  - `USER`
- Sessions are time-limited for security (recommended: 6 hours).

---

## 🗂️ Dynamic Report Collections
### Admin Panel
- Create folder structure based on:
  - **Year** (e.g. 2022, 2023)
  - **Batch** (e.g. Angkatan I, II, III)
- Created folders appear:
  - In the digital collection section for users
  - In the report upload form (dropdown selector)

### User Panel
- View folders based on year/batch dynamically
- Upload reports with:
  - `title`, `abstract`, `year`, `batch`, `cover image`, `PDF report file`
- Choose target folder (based on admin-created year/batch)
- Folder hierarchy stored in backend via model: `report_folders`

---

## 📄 Digital Collection (User)
- Users can browse public digital reports
- Users **cannot download or screenshot** reports
- PDF is rendered as read-only view
- Display:
  - Report cover (image)
  - Title, abstract

---

## 👁️ Guest Access (Public View)
- Guests can access a limited preview
  - Only **cover image** and **abstract**
- Guests **cannot** view the full PDF file
- Guests may leave a message in the `guestbook`

---

## 📒 Guestbook (Buku Tamu)
- Input: `name`, `email (optional)`, `message`
- Records appear after admin approval
- Only abstract + cover of reports are visible to guestbook visitors

---

## 🧾 Report Management (Admin)
- Admin can:
  - View all user-uploaded reports
  - Approve or reject reports
  - Add feedback
  - Assign report status:
    - `PENDING`, `IN_PROGRESS`, `COMPLETED`, `REJECTED`

---

## 📊 Visitor Analytics
- Tracks guest visits by:
  - IP address
  - Page path
  - Visit duration
  - User agent / session ID
- Data indexed for efficient querying and can be exported

---

## 📁 Upload Directory Structure
Reports and cover files are uploaded to:
```
/public/uploads/{reportType}/{year}/{batch}/
```

---

## 🔐 Permissions Summary
| Role     | View Reports | Upload | Folder Management | Admin Panel | Guestbook Access |
|----------|--------------|--------|-------------------|-------------|------------------|
| ADMIN    | ✅           | ✅     | ✅                | ✅          | ✅               |
| USER     | ✅ (Read-only)| ✅     | ❌                | ❌          | ✅               |
| GUEST    | Abstract only| ❌     | ❌                | ❌          | ✅ (limited)     |

---

This feature list is subject to expansion as more modules (e.g., feedback system, audit trail) are developed.
