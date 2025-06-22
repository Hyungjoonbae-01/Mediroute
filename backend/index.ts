import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { patientPlugin } from './api/patients'
//import { authRedirectMiddleware } from './middleware'
//import { authPlugin } from './api/auth'
import { cookie } from '@elysiajs/cookie'
//import { geminiPlugin } from './api/gemini'

/*
  Supabase Setup

  It's recommended to create your tables via the Supabase UI.
  Go to your project's SQL Editor and run the following command to create the 'patients' table.

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
*/

const app = new Elysia()
  .use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  .use(cookie())
  .use(patientPlugin)
  //.use(geminiPlugin)
  .listen(3000)

console.log(`🚀 Server running on http://localhost:3000`)