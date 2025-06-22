"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"

interface LoadingAnimationProps {
  steps: string[]
  onComplete: () => void
  stepDelay?: number
}

export function LoadingAnimation({ steps, onComplete, stepDelay = 1000 }: LoadingAnimationProps) {
  const [completedSteps, setCompletedSteps] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev < steps.length) {
          return prev + 1
        } else {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return prev
        }
      })
    }, stepDelay)

    return () => clearInterval(timer)
  }, [steps.length, onComplete, stepDelay])

  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center space-x-4 relative">
          {/* Connecting line */}
          {index < steps.length - 1 && <div className="absolute left-4 top-8 w-0.5 h-6 bg-gray-200"></div>}

          {/* Checkbox */}
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
              index < completedSteps ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
            }`}
          >
            {index < completedSteps && <Check className="w-4 h-4 text-white" />}
          </div>

          {/* Step text */}
          <span className={`transition-opacity duration-500 ${index < completedSteps ? "opacity-100" : "opacity-50"}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}
