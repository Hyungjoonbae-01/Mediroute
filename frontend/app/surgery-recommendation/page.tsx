"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Edit, Check } from "lucide-react"
import Link from "next/link"

export default function SurgeryRecommendationPage() {
  const router = useRouter()
  const [recommendation, setRecommendation] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const generateRecommendation = async () => {
      const patientData1String = localStorage.getItem("patientData")
      const patientData2String = localStorage.getItem("patientData2")

      if (!patientData1String || !patientData2String) {
        console.error("Patient data is missing.")
        // Redirecting to the first details page if data is missing
        router.push("/patient-details")
        return
      }

      const patientData1 = JSON.parse(patientData1String)
      const patientData2 = JSON.parse(patientData2String)
      const combinedData = { ...patientData1, ...patientData2 }

      try {
        const response = await fetch("/api/generate-recommendation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedData),
        })

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`)
        }

        const { recommendation: result } = await response.json()
        setRecommendation(result)
      } catch (error) {
        console.error("Failed to get recommendation:", error)
        setRecommendation("Could not generate a recommendation. Please check the console and try again.")
      } finally {
        setIsLoading(false)
      }
    }

    generateRecommendation()
  }, [router])

  const handleConfirm = () => {
    localStorage.setItem("surgeryRecommendation", recommendation)
    router.push('/hospital-selection')
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center p-4 min-h-screen font-sans">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-8">
          <Link href="/patient-details-2" className="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Required Equipment</h1>
          <div className="w-10"></div>
        </div>

        {isLoading ? (
          <div className="flex-grow flex items-center justify-center text-center">
            <div>
              <p className="text-xl font-medium text-gray-700">Generating recommendation...</p>
              <p className="text-base text-gray-500 mt-2">Please wait a moment.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-grow space-y-4">
            {isEditing ? (
              <Textarea
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                className="bg-gray-100/50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-xl resize-none text-lg w-full flex-grow p-4"
                placeholder="Enter comma-separated equipment list..."
              />
            ) : (
              <div className="bg-gray-50/50 border border-gray-200/80 rounded-xl flex-grow overflow-y-auto">
                <div className="p-6">
                  {recommendation.split(",").map((item, index) => (
                    <div key={index} className="flex items-start my-5">
                      <span className="text-2xl font-bold text-blue-500 mr-4 w-8 text-right">{index + 1}.</span>
                      <p className="text-3xl font-light text-gray-800 flex-1">
                        {item.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between mt-6">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="flex items-center gap-2 rounded-xl py-3 px-5 border-gray-300 hover:bg-gray-200/50 transition-all duration-300"
              >
                <Edit className="w-4 h-4" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-3 px-6 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Check className="w-5 h-5" />
                Confirm
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 