"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { hospitals, ERHospital, Coordinates } from "@/hospitals"
import { getDistance } from "@/lib/geo"
import { ArrowLeft, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import GoogleMap from "@/components/GoogleMap"

interface RankedHospital extends ERHospital {
  distance: number
  matchCount: number
}

export default function HospitalSelectionPage() {
  const router = useRouter()
  const [rankedHospitals, setRankedHospitals] = useState<RankedHospital[]>([])
  const [selectedHospital, setSelectedHospital] = useState<ERHospital | null>(null)
  const [userCoords, setUserCoords] = useState<Coordinates | null>(null)
  const [locationError, setLocationError] = useState(false)

  useEffect(() => {
    const fetchAndRankHospitals = (coords: Coordinates | null) => {
      const requiredEquipmentString = localStorage.getItem("surgeryRecommendation") || ""
      const requiredEquipment = requiredEquipmentString.split(",").map(e => e.trim().toLowerCase())

      const scoredHospitals = hospitals
        .map(hospital => {
          const matchCount = requiredEquipment.filter(reqEquip =>
            hospital.equipment.some(hospEquip => hospEquip.toLowerCase().includes(reqEquip))
          ).length
          const distance = coords ? getDistance(coords, hospital.coordinates) : -1
          return { ...hospital, matchCount, distance }
        })
        .sort((a, b) => {
          if (a.matchCount !== b.matchCount) return b.matchCount - a.matchCount
          if (a.distance === -1 || b.distance === -1) return 0
          return a.distance - b.distance
        })

      setRankedHospitals(scoredHospitals.slice(0, 3))
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setUserCoords(coords)
        fetchAndRankHospitals(coords)
      },
      (geoError) => {
        console.error("Geolocation error:", geoError)
        setLocationError(true)
        // Fallback to ranking without distance
        fetchAndRankHospitals(null) 
      }
    )
  }, [])

  const handleConfirm = () => {
    if (selectedHospital) {
      localStorage.setItem("selectedHospital", JSON.stringify(selectedHospital))
      router.push("/transport-info")
    }
  }

  return (
    <div className="w-full h-screen bg-white flex flex-col p-6 space-y-4">
      <div className="flex items-center justify-between flex-shrink-0">
        <Link href="/surgery-recommendation">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <h1 className="text-xl font-semibold">Hospital Selection</h1>
        <div className="w-6"></div>
      </div>

      <div className="h-2/5 flex-shrink-0 relative">
        <GoogleMap
          origin={userCoords}
          destinations={rankedHospitals.map(h => h.coordinates)}
        />
        {locationError && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Could not get your location.
          </div>
        )}
      </div>

      <h2 className="text-lg font-bold flex-shrink-0">Recommended Hospitals</h2>
      <div className="space-y-3 flex-grow overflow-y-auto pr-2">
        {rankedHospitals.map((hospital) => (
          <div
            key={hospital.id}
            onClick={() => setSelectedHospital(selectedHospital?.id === hospital.id ? null : hospital)}
            className={`p-4 rounded-xl cursor-pointer transition-all ${
              selectedHospital?.id === hospital.id ? "bg-blue-500 text-white shadow-lg" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{hospital.name}</h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${selectedHospital?.id === hospital.id ? "rotate-180" : ""}`}
              />
            </div>

            {selectedHospital?.id === hospital.id && (
              <div className="mt-4 pt-4 border-t border-blue-400 space-y-2 text-sm">
                <p><strong>Distance:</strong> {hospital.distance !== -1 ? `${hospital.distance.toFixed(1)} miles` : "N/A"}</p>
                <p><strong>Equipment Match:</strong> {hospital.matchCount} item(s)</p>
                <p><strong>Address:</strong> {hospital.address}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex-shrink-0">
        <Button
          onClick={handleConfirm}
          disabled={!selectedHospital}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium"
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}
