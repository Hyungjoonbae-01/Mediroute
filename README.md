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
cd mediroute-app
```

b. **Install Backend Dependencies**:
The backend uses Bun. Navigate to the `backend` directory and install its dependencies.
```bash
cd backend
bun install
```

c. **Install Frontend Dependencies**:
Navigate to the `frontend` directory and install its dependencies.
```bash
cd ../frontend # Or from the root: cd frontend
npm install
```

d. **Set up Supabase**:
This project uses Supabase as its database to store patient records.

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

c. **Set up environment variables**:

Create a new file named `.env` in the `backend` directory: `touch backend/.env`
Open the file and add your Supabase credentials. You can find these in your Supabase project's **Settings > API**.

```env
# Supabase credentials
SUPABASE_URL=YOUR_SUPABASE_URL_HERE
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE
```

Create another file named `.env.local` in the `frontend` directory: `touch frontend/.env.local`
Open this file and add your Google API keys:
```env
# For Gemini AI-powered recommendations
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# For displaying the map and hospitals
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```

### 3. Running the Application

This project has two separate parts that must be run concurrently in two separate terminal windows.

a. **Start the backend server**:
From the `backend` directory, run:
```bash
bun run dev
```

b. **Start the frontend development server**:
From the `frontend` directory, run:
```bash
npm run dev
```

c. **Open the application**:

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Available Scripts

#### Backend (`/backend`)
- `bun run dev`: Starts the backend server with hot-reloading.
- `bun run start`: Starts the backend server.

#### Frontend (`/frontend`)
-   `npm run dev`: Starts the development server.
-   `npm run build`: Creates a production build.
-   `npm run start`: Starts the production server after a build.
-   `npm run lint`: Runs ESLint to check for code quality issues.

---

This project was developed with assistance from an AI pair programmer. 
