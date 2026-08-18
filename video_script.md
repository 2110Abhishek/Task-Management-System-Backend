# Video Walkthrough Script - Task Management System & AbleSpace Product Analysis

**Estimated Duration**: 3 – 5 Minutes  
**Target Audience**: Technical Assessment Evaluators  

---

## 🎙️ SECTION 1: Introduction & Overview (0:00 - 0:45)

**[SHOW SCREEN]**:  
Open your deployed application homepage on Vercel (`https://your-app.vercel.app/login`).

**[VOICEOVER]**:  
> "Hello everyone! My name is Abhishek, and today I’m excited to present my submission for the Full-Stack Engineering Assessment.
> 
> This project consists of two core parts:
> 1. A high-fidelity, full-stack **Task and Project Management System** built with **Next.js 16**, **Tailwind CSS v4**, **NestJS**, and **MongoDB Atlas**.
> 2. A comprehensive **Product Understanding Analysis** of the AbleSpace 'Take Data' screen, identifying key UX/UI and functional enhancements.
> 
> Let's jump straight into the application!"

---

## 🎙️ SECTION 2: Part 1 – Application Walkthrough (0:45 - 2:30)

### A. Authentication & Guest Session
**[SHOW SCREEN]**:  
Click **"Continue as Guest"** on the login card. Watch the app transition smoothly into the main `/tasks` dashboard.

**[VOICEOVER]**:  
> "Starting with authentication: I implemented a frictionless guest login flow powered by JWT tokens. Clicking 'Continue as Guest' sends a request to our NestJS backend on Render, authenticates the session, stores the token, and directs us into the main dashboard."

---

### B. Kanban Board & List View Toggle
**[SHOW SCREEN]**:  
Demonstrate switching between **Kanban Board** and **List View** using the segmented toggle in the top right. Scroll across the columns (*To Do*, *Doing*, *Completed*, *On Hold*).

**[VOICEOVER]**:  
> "On the Tasks dashboard, users can seamlessly switch between a dynamic **Kanban Board** and a clean **List View**.
> 
> Notice the visual attention to detail: priority levels are indicated by custom 4-bar signal indicators—red for Urgent, orange for High, yellow for Medium, and gray for Low. Each task card displays subtasks, assigned team members, tags, and formatted due dates."

---

### C. Task Creation, Editing & Deleting
**[SHOW SCREEN]**:  
1. Click the **"+ Add Task"** button. Fill in Title (`Design Landing Page`), Priority (`High`), Status (`Doing`), and click **Save Task**.
2. Show the new task card appearing immediately on the board.
3. Click the three-dot (`...`) action menu on the card -> Click **Edit** -> Update the title or priority -> Save Changes.
4. Click the three-dot menu -> Click **Delete** (Trash icon in red) to show real-time deletion.

**[VOICEOVER]**:  
> "Creating and editing tasks is fast and responsive. Clicking **'+ Add Task'** opens a modal pre-filled with status and priority pickers. Saving sends a POST request to our NestJS API, which persists the task to MongoDB and updates the board instantly.
> 
> Each task card and detail header features a three-dot action popover with **Edit** and **Delete** actions. Editing opens a pre-populated overlay that updates the backend via PATCH requests."

---

### D. Projects View & Action Menus
**[SHOW SCREEN]**:  
Click **"Projects"** in the left sidebar. Show the Projects table with project titles, priority signals, team leads, and due dates. Click **"+ Add Project"** or click a row's three-dot menu to show **Edit** and **Delete**.

**[VOICEOVER]**:  
> "Moving to the **Projects** view: Here we have a high-fidelity data table displaying project titles, team leads, priorities, and due dates, complete with row action menus to edit or delete projects on the fly."

---

### E. Theme System & Profile Customization
**[SHOW SCREEN]**:  
1. Click your profile avatar in the bottom left -> Click **Change Theme** -> Switch between **Light Mode** ☼ and **Dark Mode** ☾.
2. Show **Color Mode** -> Select **Amber**, **Pink**, or **Emerald**.
3. Click **Settings** -> Edit your **Full Name**, **Title**, and **Username** -> Click **Save Changes** -> Show the green success toast badge.
4. Click the top left header icon (`PanelLeft`) to show the **Collapsible Sidebar**.

**[VOICEOVER]**:  
> "For design aesthetics, I built a dark mode using Tailwind CSS v4's `@variant dark` directive, bypassing OS overrides so users have full theme control.
> 
> Users can also select accent **Color Modes**—such as Amber, Pink, or Emerald—and edit their profile details in Settings, which syncs in real-time across the app. Finally, the sidebar can be collapsed with one click to maximize workspace screen real estate."

---

## 🎙️ SECTION 3: Part 2 – Product Understanding (AbleSpace "Take Data") (2:30 - 4:15)

**[SHOW SCREEN]**:  
Open `product_understanding.md` on your screen or switch to a slide showing the AbleSpace Caseload table.

**[VOICEOVER]**:  
> "Now, let's look at **Part 2: Product Understanding**, where I analyzed the AbleSpace **'Take Data'** workflow from the Caseload tab.
> 
> In special education, therapists use 'Take Data' to record student performance on IEP goals during sessions. The workflow starts at the Caseload tab, where the therapist selects a student, chooses target IEP goals, logs trial results like Correct, Incorrect, or Prompt levels, writes session notes, and tracks service time for Medicaid billing.
> 
> Based on real-world session conditions—where therapists multitask and manage physical materials—I identified key UX/UI and functional improvements:"

**[SHOW SCREEN]**:  
Highlight the UX/UI and Functional bullet points in `product_understanding.md`.

**[VOICEOVER]**:  
> "**UX/UI Enhancements** include:
> 1. **Mobile-First 'Blind Tapping' Zones**: Dividing the screen into large left/right touch zones so therapists can log trials by touch without looking away from the student.
> 2. **Swipable Goal Carousel Cards**: Allowing instant horizontal swipes to switch goals during multi-goal sessions.
> 3. **Floating Session Timers**: Automatically tracking session duration to pre-fill billing time.
> 
> **Functional Innovations** include:
> 1. **Voice-Activated NLP Logging**: Hands-free voice triggers like 'Log correct' when hands are busy with speech cards or sensory toys.
> 2. **Offline-First PWA Caching**: Saving trial data locally if school Wi-Fi drops and auto-syncing when reconnected.
> 3. **AI SOAP Note Generator**: Automatically drafting clinical notes from session scores to save hours of administrative paperwork."

---

## 🎙️ SECTION 4: Architecture & Conclusion (4:15 - 5:00)

**[SHOW SCREEN]**:  
Show your GitHub repository (`https://github.com/2110Abhishek/Task-Management-System-Frontend`) and Vercel / Render deployment dashboards.

**[VOICEOVER]**:  
> "To summarize the architecture: The frontend is deployed on **Vercel**, the NestJS REST API is deployed on **Render**, and data is persisted on **MongoDB Atlas**.
> 
> The codebase strictly adheres to component reusability, TypeScript safety, clean modular architecture, and full responsive design.
> 
> Thank you so much for your time and review! All code, deployment links, and documentation are available in the public GitHub repositories."
