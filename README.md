<div align="center">
  <img src="public/Antiqo Mockup.png" alt="Antiqo Logo" width="700">
</div>


# Antiqo - Historical Artifacts Tracker

## Project Overview
Antiqo is a web application designed to manage and showcase historical artifacts. Users can browse, view, and contribute artifacts, like and track their submissions, all within a user-friendly and responsive platform that highlights cultural and historical treasures.

## Live Project Link
- **[Live Site](https://antiqo-tracker.web.app/)**

## Technologies Used
- **Frontend**: React, Tailwind CSS, Flowbite, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Hosting**: Firebase (Frontend), Vercel (Backend)

## README File

### Project Overview
Antiqo is a dynamic platform for historical artifact enthusiasts. It enables users to explore, contribute, and interact with a wide array of historical items, emphasizing seamless user experience and secure data management.

### Technologies Used
- **Frontend**: React, Tailwind CSS, Flowbite, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Hosting**: Firebase, Vercel

### Core Features
1. **User Authentication**: Email/password and Google/GitHub login, with protected routes.
2. **Responsive Design**: Optimized for mobile, tablet, and desktop.
3. **Artifact Management**: Add, update, and delete artifacts with real-time feedback.
4. **User Interaction**: Like artifacts, track liked items, and view contributions.
5. **Search & Filter**: Search artifacts by name and display featured items.
6. **Enhanced UX**: Dynamic titles, 404 page, loading spinners, and toast notifications.
7. **Secure Configuration**: Environment variables for Firebase and MongoDB.

### Dependencies
- react-router-dom
- tailwindcss
- daisyui
- framer-motion
- react-toastify
- axios
- jsonwebtoken
- dotenv

### How to Run Locally
1. **Clone the repositories:**
   ```bash
   git clone https://github.com/ornobaadi/Antiqo-Tracker-Client.git
   git clone https://github.com/ornobaadi/Antiqo-Tracker-Server.git
   ```
2. **Navigate to each directory and install dependencies:**
   ```bash
   cd Antiqo-Tracker-Client
   npm install
   
   cd ../Antiqo-Tracker-Server
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in both `client` and `server` directories with the required keys.
4. **Run the applications:**
   ```bash
   cd Antiqo-Tracker-Client
   npm run dev
   
   cd ../Antiqo-Tracker-Server
   nodemon index.js
   ```
5. **Visit the frontend:** Open `http://localhost:5173` in your browser.

### Live Links & Resources
- **[Live Site](https://antiqo-tracker.web.app/)**
- **[Client Repository](https://github.com/ornobaadi/Antiqo-Tracker-Client)**
- **[Server Repository](https://github.com/ornobaadi/Antiqo-Tracker-Server)**

