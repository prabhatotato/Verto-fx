# Employee Hub

A full-stack employee management system built with **React (frontend)**, **Express.js (backend)**, and **PostgreSQL (database)**.  
The app allows you to **add, edit, search, and delete employees** in a clean and simple UI.

---

## System Workflow

     ┌───────────────────┐
     │   React Frontend  │
     │ ┌───────────────┐ │
     │ │ EmployeeList  │ │
     │ │ EmployeeForm  │ │
     │ │ EmployeeModal │ │
     │ └───────────────┘ │
     └─────────┬─────────┘
               │ Axios / Fetch
               │ (API calls)
               ▼
     ┌───────────────────┐
     │  Express Backend  │
     │ ┌───────────────┐ │
     │ │ Routes         │ │
     │ │ Controllers    │ │
     │ │ Business Logic │ │
     │ └───────────────┘ │
     └─────────┬─────────┘
               │ PostgreSQL queries
               ▼
     ┌───────────────────────┐
     │   PostgreSQL Database │
     │  employee table       │
     │  (id, name, email, position) │
     └───────────────────────┘


---

## Prerequisites

Before starting, ensure you have the following installed on your system:

* **Node.js** (version 14 or higher is recommended)
* **npm** (Node Package Manager, installed with Node.js)

## ⚙️ Setup and Installation

You will need to install dependencies separately for both the backend and the frontend.

### 1. Backend Setup

The backend runs on Express and handles API requests.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install server dependencies:**
    ```bash
    npm install
   
    ```

3.  **Create an Environment File:**
    Create a file named **`.env`** in the `backend/` directory. This file should contain environment variables necessary for the server (e.g., port number and database connection strings).

    **Example `.env` file:**
    ```env
    PORT=3000
    SUPABASE_URL= 'https://ybzefjinhcnfdcfbysre.supabase.co'
    SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliemVmamluaGNuZmRjZmJ5c3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NzEwNTIsImV4cCI6MjA3NDQ0NzA1Mn0.I2-WbkIZFRASW6Anp-MawbOt6Wda0CJgUQ98DTI5LO0'
    ```

### 2. Frontend Setup

The frontend runs on React and serves the user interface.

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install client dependencies:**
    ```bash
    npm install
    ```

## ▶️ Running the Application

Both the server and the client must be running simultaneously to use the full application.

### 1. Start the Backend Server

Open your **first** terminal window:

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Run the server:
    ```bash
    node server.js
    ```
    The server should now be running at `http://localhost:3000`.

### 2. Start the Frontend Client

Open your **second** terminal window:

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Start the React application:
    ```bash
    npm run dev
    ```
    The React application will usually open automatically in your browser at `http://localhost:8080`.

---

**You are now running the full-stack application!**