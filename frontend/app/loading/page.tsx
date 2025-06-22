"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

const steps = [
  "Reviewing patient details",
  "Contacting nearby hospitals",
  "Checking doctor availability",
  "Listing suitable hospitals",
]

export default function LoadingPage() {
  const router = useRouter()
  const [completedSteps, setCompletedSteps] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev < steps.length) {
          return prev + 1
        } else {
          clearInterval(timer)
          setTimeout(() => router.push("/hospital-selection"), 500)
          return prev
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        <p className="text-gray-500 mb-2">Just a moment...</p>
        <h1 className="text-2xl font-bold mb-12 text-center">Analyzing patient data and GPS information</h1>

        <div className="space-y-6 text-left inline-block">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4 relative">
              {index < steps.length - 1 && <div className="absolute left-4 top-8 w-0.5 h-6 bg-gray-200"></div>}

              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                  index < completedSteps ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
                }`}
              >
                {index < completedSteps && <Check className="w-4 h-4 text-white" />}
              </div>

              <span
                className={`transition-opacity duration-500 ${index < completedSteps ? "opacity-100" : "opacity-50"}`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
