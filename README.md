# MediRoute - Emergency Medical Transport Application

MediRoute is a smart, proof-of-concept application designed to optimize emergency medical transport by helping paramedics quickly identify the most suitable hospital for a patient based on their symptoms, required equipment, and real-time location data.

## Features

- **Patient Triage**: A multi-step form to capture patient details, vitals, and treatments given.
- **AI-Powered Recommendations**: Uses the Gemini API to analyze patient symptoms and determine a list of highly specialized or uncommon equipment that may be required.
- **Smart Hospital Matching**: Ranks nearby hospitals based on equipment availability and distance.
- **Interactive Map View**: Displays the user's location and the top three recommended hospitals on a Google Map.
- **Seamless Navigation**: One-click navigation that opens Google Maps with driving directions to the selected hospital.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **AI**: Google Gemini API
- **Mapping**: Google Maps Platform

## Project Structure

The entire application is contained within the `/frontend` directory, which is a standard Next.js project using the App Router.

-   **/frontend/app**: Contains all pages and UI.
    -   **/api**: Server-side API routes, including the Gemini endpoint.
    -   Each subdirectory like `/patient-details`, `/hospital-selection`, etc., represents a route in the application.
-   **/frontend/components**: Shared React components (e.g., `GoogleMap`).
-   **/frontend/lib**: Utility functions (e.g., `geo.ts` for distance calculation).
-   **/frontend/hospitals.ts**: A static dataset of hospitals.

## Getting Started

Follow these steps to set up and run the application locally.

### 1. Prerequisites

- Node.js (v18 or later)
- An active internet connection
- A modern web browser with location services enabled

### 2. Installation and Configuration

a. **Clone the repository**:
```bash
git clone https://github.com/Hyungjoonbae-01/Mediroute
cd Mediroute-app
```

b. **Set up Supabase & Environment Variables**:
This project requires API keys for Supabase, Google Maps, and Gemini.

1.  **Set up Supabase**: Follow the instructions in the "Set up Supabase" section below to create your database and get your keys.
2.  **Create Backend `.env` file**: In the `/backend` directory, create a `.env` file and add your Supabase credentials.
    ```env
    # backend/.env
    SUPABASE_URL=YOUR_SUPABASE_URL_HERE
    SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE
    ```
3.  **Create Frontend `.env.local` file**: In the `/frontend` directory, create a `.env.local` file and add your Google API keys.
    ```env
    # frontend/.env.local
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
    ```

c. **Install All Dependencies**:
From the root directory of the project, run the following command. 
```bash
cd frontend
npm install
```

```bash
cd backend
npm install
```

### 3. Running the Application

From the root directory, run a single command to start both the backend and frontend servers concurrently:
```bash
npm run dev
```
The backend will run on `http://localhost:3000` and the frontend on `http://localhost:3001`.

Open your browser and navigate to **[http://localhost:3001](http://localhost:3001)** to see the application.

### Set up Supabase

1.  Go to [Supabase](https://supabase.com/) and create a new project.
2.  Inside your project, go to the **SQL Editor**.
3.  Click **New query** and run the following SQL to create the `patients` table:
    ```sql
    CREATE TABLE patients (
      id SERIAL PRIMARY KEY,
      patient_name VARCHAR(255),
      not_applicable BOOLEAN DEFAULT FALSE,
      age_range VARCHAR(50) NOT NULL,
      gender VARCHAR(20) NOT NULL,
      heart_rate VARCHAR(20) NOT NULL,
      blood_pressure VARCHAR(20) NOT NULL,
      oxygen_saturation VARCHAR(20) NOT NULL,
      symptoms TEXT NOT NULL,
      consciousness VARCHAR(50),
      pupils VARCHAR(50),
      skin_condition VARCHAR(50),
      comments TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    ```

### Available Scripts
All scripts are run from the project's root directory.
- `npm run dev`: Starts both backend and frontend servers.
- `npm run dev:backend`: Starts only the backend server.
- `npm run dev:frontend`: Starts only the frontend server.
- `npm install`: Installs dependencies for both projects.

---

This project was developed with assistance from an AI pair programmer. 
