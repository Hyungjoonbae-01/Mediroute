"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PatientDetails2Page() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    heartRate: "",
    bloodPressure: "",
    oxygenSaturation: "",
    comments: "",
  })

  const isFormComplete = () => {
    return Object.values(formData).every((value) => value.trim() !== "")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (isFormComplete()) {
      const patientDataString = localStorage.getItem('patientData')
      if (!patientDataString) {
        console.error('Patient data from the first form is missing.')
        // Optionally: show an error to the user
        return
      }
      const patientData1 = JSON.parse(patientDataString)
      const combinedData = { ...patientData1, ...formData }

      try {
        const response = await fetch('http://localhost:3000/patients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(combinedData),
        })

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`)
        }

        const newPatientRecord = await response.json()
        console.log('Submission successful:', newPatientRecord)
        
        // Persist data for other pages
        localStorage.setItem('patientData2', JSON.stringify(formData))
        localStorage.setItem('newlyCreatedPatient', JSON.stringify(newPatientRecord[0]))
        
        router.push('/surgery-recommendation')
      } catch (error) {
        console.error('Failed to submit patient data:', error)
        // Optionally: show an error to the user
      }
    }
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/patient-details">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold">Patient Details</h1>
          <div className="w-6"></div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input
              type="number"
              placeholder="Heart Rate"
              value={formData.heartRate}
              onChange={(e) => handleInputChange("heartRate", e.target.value)}
              className="bg-gray-100 border-0 rounded-xl h-14 pr-16"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">bpm</span>
          </div>

          <div className="relative">
            <Input
              type="text"
              placeholder="Blood Pressure"
              value={formData.bloodPressure}
              onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
              className="bg-gray-100 border-0 rounded-xl h-14 pr-20"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">mmHg</span>
          </div>

          <div className="relative">
            <Input
              type="number"
              placeholder="Oxygen Saturation"
              value={formData.oxygenSaturation}
              onChange={(e) => handleInputChange("oxygenSaturation", e.target.value)}
              className="bg-gray-100 border-0 rounded-xl h-14 pr-12"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
          </div>

          <Textarea
            placeholder="Treatment Given/Comments"
            value={formData.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            className="bg-gray-100 border-0 rounded-xl min-h-[120px] resize-none"
          />

          <Button
            onClick={handleSubmit}
            disabled={!isFormComplete()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium mt-8"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
