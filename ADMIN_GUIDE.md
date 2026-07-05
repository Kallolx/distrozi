# Distrozi Admin Support Desk Portal Guide

This guide details how to navigate, access, and operate the admin dashboard for managing creator support tickets.

---

## 🗺️ System Flow Diagram

The diagram below shows how client support ticket submissions are logged, stored, and managed under the current serverless architecture:

```mermaid
graph TD
    A[Creator on /support/form-id] -- Submits Ticket Form --> B[POST /api/send-email]
    B -- Node.js Interception --> C[(data/support-tickets.json)]
    B -- SMTP Transport --> D[support@distrozi.com Inbox]
    
    E[Administrator] -- Accesses /admin/tickets --> F{Passcode Gate}
    F -- Validates Token Headers --> G[GET /api/admin/tickets]
    G -- Reads DB --> C
    
    E -- Reviews Metadata / Edits Logs --> H[POST /api/admin/tickets]
    H -- Updates Ticket Status & Remarks --> C
```

---

## 🚀 How to Access & Authenticate

1. **Start the Project locally**:
   ```bash
   npm run dev
   ```
2. **Navigate to the admin portal route**:
   Open your browser and go directly to:
   👉 **`http://localhost:3000/admin/tickets`** (or your Vercel deployment URL `/admin/tickets`).
3. **Passcode Validation**:
   - The page is locked by a secure server-side passcode gate.
   - Enter your administrator key to unlock the dashboard.
   - The default passcode key is **`distrozi2026`**.
   - Your key is securely stored in `sessionStorage` in the browser and passed via an `Authorization: Bearer <key>` header on every request. This ensures no credentials are exposed in client-side production javascript bundles.

---

## 📊 Operations Dashboard Overview

Once authenticated, the dashboard workspace opens and offers the following actions:

### 1. High-Level Metrics
- Quick metrics track the count of **Total Tickets**, **Pending Review**, **In Progress**, and **Resolved** requests in real-time.

### 2. Real-Time Search Engine
- Type inside the search bar at the top right to filter tickets dynamically. You can search by:
  - **Ticket ID** (e.g., `DT-839281`)
  - **Platform classification / Form type** (e.g., `YouTube Claim Release`)
  - **Artist Stage Name**
  - **Song Title**
  - **Creator Email Address**
  - **Label / Company Name**

### 3. Status Tab Filters
- Click the filter buttons (`All`, `Pending`, `In Progress`, `Resolved`, `Rejected`) to filter down the table instantly.

### 4. Reviewing Details (Slide-over Drawer)
- Click **Review** on any ticket row to slide open the detail panel.
- **Submitted Metadata**: This panel dynamically extracts and displays every field filled out by the creator (e.g. UPC, ISRC, video URLs, timestamps, confirmation declarations) formatted professionally.
- **Desk Operations Form**:
  - **Operational Status**: Change status dropdown (e.g., set to *In Progress* or *Resolved*).
  - **Internal Desk Remarks**: Type internal notes, processing records, or action logs. **These remarks are internal and only visible to administrators on this panel.**
  - Click **Save Logs & Update Status** to save changes.

---

## ⚙️ Configuration & Deployments

### Changing the Passcode in Vercel
The passcode is verified on the server side using the `ADMIN_PASSCODE` environment variable. To configure it for your production deploy:
1. Go to your **Vercel Project Dashboard**.
2. Navigate to **Settings** $\rightarrow$ **Environment Variables**.
3. Create a new variable:
   - **Key**: `ADMIN_PASSCODE`
   - **Value**: `[YourCustomSecretKey]`
4. Re-deploy the project.

### Local Development Configuration
You can also set this passcode locally inside your **`.env.local`** file (which is ignored by Git to keep passwords safe):
```env
ADMIN_PASSCODE=distrozi2026
```
To template new environment settings, edit **`.env.example`** in the project root.
