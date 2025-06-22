"use client"
import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

interface GoogleMapProps {
  origin?: google.maps.LatLngLiteral | null
  destinations?: google.maps.LatLngLiteral[]
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export default function GoogleMap({ origin, destinations }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([])

  useEffect(() => {
    if (!API_KEY) {
      setError("Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file and restart the server.")
      return
    }

    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
      libraries: ["marker"],
    })

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary
      if (mapRef.current) {
        const newMap = new Map(mapRef.current, {
          center: { lat: 42.3601, lng: -71.0589 }, // Default to Boston
          zoom: 11,
          disableDefaultUI: true,
          mapId: "MEDIROUTE_MAP" // A custom Map ID is required for Advanced Markers
        })
        setMap(newMap)
      }
    }).catch((e) => {
      console.error(e)
      setError("Failed to load Google Maps. Check your API key and internet connection.")
    })
  }, [])

  // Update markers based on props
  useEffect(() => {
    if (!map) return

    // Clear previous markers
    markers.forEach(marker => marker.map = null)
    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = []
    
    const bounds = new google.maps.LatLngBounds()

    if (origin) {
      bounds.extend(origin)
      const originMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: origin,
        title: "Your Location"
      })
      newMarkers.push(originMarker)
    }

    destinations?.forEach(dest => {
      bounds.extend(dest)
      const hospitalMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: dest,
      })
      newMarkers.push(hospitalMarker)
    })
    
    setMarkers(newMarkers)

    if(origin || (destinations && destinations.length > 0)) {
      map.fitBounds(bounds)
    }

  }, [map, origin, destinations])

  return (
    <div className="w-full h-full rounded-xl relative bg-gray-200 flex items-center justify-center">
      <div ref={mapRef} className="w-full h-full rounded-xl" />
      {error && (
        <div className="absolute top-0 left-0 w-full h-full bg-red-100/90 flex items-center justify-center p-4 rounded-xl">
          <p className="text-center text-red-700 font-medium">{error}</p>
        </div>
      )}
    </div>
  )
}
