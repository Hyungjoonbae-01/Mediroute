import { Coordinates } from "@/hospitals"

/**
 * Calculates the distance between two geographical coordinates in miles.
 * Uses the Haversine formula for calculation.
 *
 * @param coords1 - The first set of coordinates.
 * @param coords2 - The second set of coordinates.
 * @returns The distance in miles.
 */
export function getDistance(coords1: Coordinates, coords2: Coordinates): number {
  const toRad = (value: number) => (value * Math.PI) / 180
  const R = 3958.8 // Earth's radius in miles

  const dLat = toRad(coords2.lat - coords1.lat)
  const dLon = toRad(coords2.lng - coords1.lng)
  const lat1 = toRad(coords1.lat)
  const lat2 = toRad(coords2.lat)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
} 