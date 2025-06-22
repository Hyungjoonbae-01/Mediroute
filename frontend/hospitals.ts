/*
 * Static dataset of Emergency Room (ER) hospitals in the greater-Boston area.
 * ---------------------------------------------------------------------------
 * This file can be imported wherever you need quick in-memory look-ups without
 * a full database.  Add/modify fields to suit your application (e.g. real-time
 * bed counts, API IDs, etc.).
 */

export type TraumaLevel = "I" | "II" | "III" | "IV" | "V";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BedCapacity {
  icu: number;   // number of ICU beds
  er: number;    // number of ER treatment bays
}

export interface ERHospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  coordinates: Coordinates;
  traumaLevel: TraumaLevel;
  equipment: string[];     // key on-site equipment modalities
  specialties: string[];   // notable specialty services
  bedCapacity: BedCapacity;
  notes?: string;          // misc. operational notes
}

export const hospitals: ERHospital[] = [
  {
    id: 1,
    name: "Massachusetts General Hospital – Emergency Department",
    address: "55 Fruit St, Boston, MA 02114",
    phone: "+1 (617) 724-4100",
    coordinates: { lat: 42.3626, lng: -71.0695 },
    traumaLevel: "I",
    equipment: [
      "64-slice CT Scanner",
      "1.5T & 3T MRI",
      "Cardiac Cath Lab",
      "Hyperbaric Chamber",
      "Helipad"
    ],
    specialties: [
      "Comprehensive Stroke Center",
      "Burn Center",
      "Pediatric Emergency Services",
      "Level-I Trauma"
    ],
    bedCapacity: { icu: 130, er: 94 },
    notes: "Flagship Harvard Medical School teaching hospital."
  },
  {
    id: 2,
    name: "Brigham and Women's Hospital – Emergency Department",
    address: "75 Francis St, Boston, MA 02115",
    phone: "+1 (617) 732-5630",
    coordinates: { lat: 42.3357, lng: -71.1057 },
    traumaLevel: "I",
    equipment: [
      "Dual-energy CT",
      "3T MRI",
      "Interventional Radiology Suite",
      "ECMO",
      "Helipad"
    ],
    specialties: [
      "High-risk Obstetrics",
      "Cardiovascular Center",
      "Neurosurgery",
      "Level-I Trauma"
    ],
    bedCapacity: { icu: 120, er: 72 },
    notes: "Renowned for cardiac & women's health care."
  },
  {
    id: 3,
    name: "Beth Israel Deaconess Medical Center – Emergency Department",
    address: "1 Deaconess Rd, Boston, MA 02215",
    phone: "+1 (617) 667-7000",
    coordinates: { lat: 42.3389, lng: -71.1083 },
    traumaLevel: "I",
    equipment: [
      "Multislice CT",
      "1.5T MRI",
      "CyberKnife Radiosurgery",
      "Robotic Surgery Suite"
    ],
    specialties: [
      "Liver Transplant Unit",
      "Stroke Center",
      "Level-I Trauma"
    ],
    bedCapacity: { icu: 95, er: 65 },
    notes: "Part of Beth Israel Lahey Health network."
  },
  {
    id: 4,
    name: "Boston Medical Center – Emergency Department",
    address: "840 Harrison Ave, Boston, MA 02118",
    phone: "+1 (617) 414-4075",
    coordinates: { lat: 42.3352, lng: -71.0757 },
    traumaLevel: "I",
    equipment: [
      "Trauma Resuscitation Bays",
      "CT & MRI",
      "Endoscopy Suite",
      "Dedicated Pediatric ER"
    ],
    specialties: [
      "Level-I Trauma",
      "Pediatric Level-II Trauma",
      "Helipad"
    ],
    bedCapacity: { icu: 110, er: 94 },
    notes: "Largest 24-hour Level-I trauma center in New England."
  },
  {
    id: 5,
    name: "Tufts Medical Center – Emergency Department",
    address: "830 Washington St, Boston, MA 02111",
    phone: "+1 (617) 636-5580",
    coordinates: { lat: 42.3493, lng: -71.0629 },
    traumaLevel: "I",
    equipment: [
      "CT",
      "MRI",
      "Cardiac Cath Lab",
      "Hybrid OR"
    ],
    specialties: [
      "New England Eye Center",
      "Floating Hospital for Children",
      "Level-I Trauma"
    ],
    bedCapacity: { icu: 80, er: 60 },
    notes: "Academic medical center affiliated with Tufts University School of Medicine."
  },
  {
    id: 6,
    name: "Cambridge Hospital – CHA Emergency Department",
    address: "1493 Cambridge St, Cambridge, MA 02139",
    phone: "+1 (617) 665-1000",
    coordinates: { lat: 42.3734, lng: -71.1040 },
    traumaLevel: "II",
    equipment: [
      "CT",
      "Ultrasound",
      "Negative Pressure Rooms"
    ],
    specialties: [
      "Psychiatric Emergency Services",
      "Sexual Assault Nurse Examiner (SANE)",
      "Level-II Trauma"
    ],
    bedCapacity: { icu: 12, er: 30 },
    notes: "Community hospital within the Cambridge Health Alliance."
  },
  {
    id: 7,
    name: "South Shore Hospital – Emergency Department",
    address: "55 Fogg Road, South Weymouth, MA 02190",
    phone: "+1 (781) 624-8000",
    coordinates: { lat: 42.2079, lng: -70.9341 },
    traumaLevel: "II",
    equipment: ["CT Scanner", "ICU", "Helipad", "Emergency OR"],
    specialties: ["Adult Level‑II Trauma", "Stroke", "Burn"],
    bedCapacity: { icu: 50, er: 80 },
    notes: "First ACS‑verified Level II trauma center south of Boston"
  },
  {
    id: 8,
    name: "Newton‑Wellesley Hospital – Emergency Department",
    address: "2014 Washington St, Newton, MA 02462",
    phone: "+1 (617) 243-6000",
    coordinates: { lat: 42.3366, lng: -71.2090 },
    traumaLevel: "III",
    equipment: ["CT Scanner", "Ultrasound", "Lab on site"],
    specialties: ["Adult + Pediatric ER", "Community Teaching Hospital"],
    bedCapacity: { icu: 0, er: 44 },
    notes: "24‑hr adult & pediatric emergency pavilion; no trauma designation"
  },
  {
    id: 9,
    name: "Boston Medical Center – South",
    address: "100 District Avenue, Dorchester, MA 02125",
    phone: "+1 (617) 414-4000",
    coordinates: { lat: 42.3300, lng: -71.0750 },
    traumaLevel: "III",
    equipment: ["CT Scanner", "ER Beds", "Diagnostic Imaging"],
    specialties: ["Adult Level‑III Trauma", "General ER"],
    bedCapacity: { icu: 20, er: 50 },
    notes: "Satellite campus: 237 beds; ~51k ER visits/yr"
  },
  {
    id: 10,
    name: "MelroseWakefield Hospital – Emergency Department",
    address: "585 Lebanon St, Melrose, MA 02176",
    phone: "+1 (781) 979-3000",
    coordinates: { lat: 42.4648, lng: -71.0607 },
    traumaLevel: "III",
    equipment: ["CT", "X-ray", "On-site labs"],
    specialties: ["Community ER", "Cardiac Care"],
    bedCapacity: { icu: 15, er: 30 },
    notes: "Part of Tufts Medicine; no formal trauma designation"
  },
  {
    id: 11,
    name: "Lawrence General Hospital – Emergency Department",
    address: "1 General St, Lawrence, MA 01841",
    phone: "+1 (978) 683-4000",
    coordinates: { lat: 42.7053, lng: -71.1631 },
    traumaLevel: "III",
    equipment: ["CT", "MRI", "Emergency Surgery"],
    specialties: ["Level-III Trauma", "Stroke"],
    bedCapacity: { icu: 20, er: 40 },
    notes: "ACS-verified Level III trauma center"
  },
  {
    id: 12,
    name: "Lahey Hospital & Medical Center – Emergency Department",
    address: "41 Mall Rd, Burlington, MA 01805",
    phone: "+1 (781) 744-5100",
    coordinates: { lat: 42.5035, lng: -71.1911 },
    traumaLevel: "I",
    equipment: ["CT", "MRI", "Cath Lab", "ICU"],
    specialties: ["Level-I Trauma", "Surgery", "Transplant"],
    bedCapacity: { icu: 75, er: 60 },
    notes: "Beth Israel Lahey Health flagship with full trauma services"
  },
  {
    id: 13,
    name: "Lowell General Hospital – Emergency Department",
    address: "295 Varnum Ave, Lowell, MA 01854",
    phone: "+1 (978) 937-6000",
    coordinates: { lat: 42.6537, lng: -71.3243 },
    traumaLevel: "III",
    equipment: ["CT", "MRI", "On-site surgery"],
    specialties: ["Emergency Care", "Orthopedic Surgery"],
    bedCapacity: { icu: 24, er: 40 },
    notes: "Community hospital with ER and surgical services"
  },
  {
    id: 14,
    name: "Beverly Hospital – Emergency Department",
    address: "85 Herrick St, Beverly, MA 01915",
    phone: "+1 (978) 922-3000",
    coordinates: { lat: 42.5747, lng: -70.8796 },
    traumaLevel: "III",
    equipment: ["CT", "Ultrasound", "X-ray"],
    specialties: ["General ER", "Pediatric Services"],
    bedCapacity: { icu: 16, er: 30 },
    notes: "Beth Israel Lahey community ER"
  },
  {
    id: 15,
    name: "Winchester Hospital – Emergency Department",
    address: "41 Highland Ave, Winchester, MA 01890",
    phone: "+1 (781) 729-9000",
    coordinates: { lat: 42.4518, lng: -71.1412 },
    traumaLevel: "III",
    equipment: ["CT", "Ultrasound", "24/7 Labs"],
    specialties: ["Community ER", "OB/GYN"],
    bedCapacity: { icu: 12, er: 28 },
    notes: "Community ER with comprehensive support services"
  }
];

// Utility: quick look-up by ID
export const getHospitalById = (id: number): ERHospital | undefined =>
  hospitals.find((h) => h.id === id);
