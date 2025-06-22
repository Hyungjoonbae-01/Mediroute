"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ERHospital } from "@/hospitals"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Navigation, MapPin, Hospital, Heart, Droplets, Waves } from "lucide-react"
import Link from "next/link"

interface PatientData1 {
  age: string
  gender: string
  allergies: string
}

interface PatientData2 {
  heartRate: string
  bloodPressure: string
  oxygenSaturation: string
  comments: string
}

export default function TransportInfoPage() {
  const router = useRouter()
  const [hospital, setHospital] = useState<ERHospital | null>(null)
  const [patientData1, setPatientData1] = useState<PatientData1 | null>(null)
  const [patientData2, setPatientData2] = useState<PatientData2 | null>(null)

  useEffect(() => {
    const storedHospital = localStorage.getItem("selectedHospital")
    const storedPatientData1 = localStorage.getItem("patientData")
    const storedPatientData2 = localStorage.getItem("patientData2")

    if (storedHospital) setHospital(JSON.parse(storedHospital))
    if (storedPatientData1) setPatientData1(JSON.parse(storedPatientData1))
    if (storedPatientData2) setPatientData2(JSON.parse(storedPatientData2))

    if (!storedHospital) {
      router.push("/hospital-selection")
    }
  }, [router])

  const handleNavigate = () => {
    if (hospital) {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        hospital.address
      )}&travelmode=driving`
      window.open(googleMapsUrl, "_blank")
    }
  }

  if (!hospital || !patientData1 || !patientData2) {
    return <div className="flex items-center justify-center h-screen"><p>Loading transport data...</p></div>
  }

  const treatmentItems = patientData2.comments.split(/, |\\n/).filter(item => item.trim() !== "")

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <div className="p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <Link href="/hospital-selection">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold">Transport Information</h1>
          <div className="w-6"></div>
        </div>

        <div className="h-48 rounded-xl overflow-hidden bg-gray-200">
           <img
             src="/route-on-a-map.avif"
             alt="Route map"
             className="w-full h-full object-cover"
           />
        </div>
      </div>

      <div className="px-6 space-y-4 flex-grow overflow-y-auto pb-28">
        {/* Destination */}
        <div>
          <h2 className="text-lg font-bold mb-2">Destination</h2>
          <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Hospital className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-lg">{hospital.name}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1.5" />
                {hospital.address}
              </div>
            </div>
          </div>
        </div>
        
        {/* Patient Info */}
        <div>
          <h2 className="text-lg font-bold mb-2">Patient Information</h2>
          <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-3 gap-4 text-sm text-center">
            <div><strong className="block text-gray-500 font-medium">Gender</strong> {patientData1.gender}</div>
            <div><strong className="block text-gray-500 font-medium">Age</strong> {patientData1.age}</div>
            <div><strong className="block text-gray-500 font-medium">Allergies</strong> {patientData1.allergies || 'N/A'}</div>
          </div>
        </div>

        {/* Vitals */}
        <div>
          <h2 className="text-lg font-bold mb-2">Vital Signs</h2>
          <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
             <div className="flex flex-col items-center"><Heart className="w-6 h-6 text-red-500 mb-1" /><strong>{patientData2.heartRate}</strong><span className="text-xs text-gray-500">bpm</span></div>
             <div className="flex flex-col items-center"><Droplets className="w-6 h-6 text-sky-500 mb-1" /><strong>{patientData2.bloodPressure}</strong><span className="text-xs text-gray-500">mmHg</span></div>
             <div className="flex flex-col items-center"><Waves className="w-6 h-6 text-teal-500 mb-1" /><strong>{patientData2.oxygenSaturation}</strong><span className="text-xs text-gray-500">%</span></div>
          </div>
        </div>

        {/* Treatment Given */}
        <div>
          <h2 className="text-lg font-bold mb-2">Treatment Given</h2>
          <div className="bg-gray-50 rounded-xl p-4">
            {treatmentItems.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-sm">
                {treatmentItems.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            ) : <p className="text-sm text-gray-500">No specific treatments listed.</p>}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t">
        <Button onClick={handleNavigate} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
          <Navigation className="w-6 h-6" />
          Navigate
        </Button>
      </div>
    </div>
  )
}
