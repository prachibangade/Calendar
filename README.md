
Google Calendar Clone Application The aim of this project is to build a high-fidelity clone of Google Calendar where users can manage their schedule.
Overview- 
•	View Calendar in Month, Week, and Day views.
•	Create, Edit, and Delete Events Real-time database storage using PostgreSQL.
Requirements- Visual Studio Code Node.js
Installations-
Setup and run instructions
1.	Set up Next.js 
2.	Project
•	Initialize the project “npx create-next-app@latest google-calendar-clone”
3.	Open the directory “cd google-calendar-clone”
4.	Install UI Library (Shadcn UI) “npx shadcn@latest init”
5.	Install Core Dependencies 
•	“npm install mongoose dayjs clsx tailwind-merge lucide-react”
•	“ npm install -D tailwindcss-animate”
6.	Database Configuration (MongoDB Atlas
Get Connection String
•	Log in to MongoDB Atlas and create a free cluster.
•	Click Connect > Drivers to copy your connection string.
•	Ensure Network Access allows your IP address.
Configure Environment
•	Add your connection string (replace <password> with your actual DB password)
7.	Execution: Start Development Server Launch the application in development mode:
•	“npm run dev”

Explanation of Architecture & Technology Choices
This project utilizes a Full-Stack Next.js Architecture to combine frontend interactivity and backend logic into a single, unified codebase.
1. Frontend Framework: Next.js (App Router)
Next.js was chosen for its hybrid rendering capabilities. The App Router allows us to use Server Components for efficient initial data fetching (like loading the calendar view) and Client Components for interactivity (like clicking to create an event).
2. Backend Logic: Server Actions
Instead of building a separate REST API server, we utilize Next.js Server Actions. This allows us to write backend logic (saving events to MongoDB) directly alongside the frontend code.
3. Database: MongoDB (Atlas)
MongoDB is a NoSQL database that offers a flexible schema. Atlas was selected for its cloud-hosting capabilities, ensuring the database is accessible from anywhere without local configuration headaches.
4. ODM: Mongoose
While MongoDB is flexible, application logic requires structure. Mongoose provides a schema-based solution to model application data. It ensures that every event saved to the database has the required fields (like startTime and title), preventing data corruption and runtime errors.
5. UI & Styling: Tailwind CSS + Shadcn UI
To satisfy the "High Fidelity" requirement.
•	Tailwind CSS: Allows for rapid, utility-first styling to handle complex layouts like the calendar grid and responsive design.
•	Shadcn UI: A collection of accessible, reusable components (like Dialogs and Buttons).
Discussion of Business Logic and Edge Cases
The application handles all core calendar logic including creating, editing and deleting events. Each event is validated to ensure correct date/time format and that the start time is before the end time. Events are stored in the database and retrieved based on the selected view (Month/Week/Day). Overlapping events are supported and displayed side-by-side, similar to Google Calendar, ensuring a realistic UI even when multiple events share the same time slot. Basic recurring events (daily/weekly/monthly) can be handled by storing a recurrence rule and generating event instances within the selected date range. Drag-and-drop and resize interactions update the event time in real-time, with backend updates ensuring data consistency.
Notes on Animations and Interactions
Smooth animations and interactions are implemented using TailwindCSS transitions and ShadCN UI components. Popovers, modals, dropdowns and side panels open with soft fade or scale animations to create a modern, polished experience. Calendar view transitions are fluid when switching between Month, Week and Day views. Drag-and-drop and resize interactions offer instant visual feedback through optimistic UI updates, making event movement feel fast and responsive. Hover effects and subtle animations enhance usability and match Google Calendar–like behavior.

Suggestions for future enhancements.
Add advanced features like appointment scheduling and task management similar to Google Calendar’s Tasks/Reminders.

Github Link:- https://github.com/prachibangade/Calendar



