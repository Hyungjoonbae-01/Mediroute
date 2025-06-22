"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Search } from "lucide-react"

const symptoms = [
  "Airway Obstruction",
  "Allergic Reaction",
  "Altered Level of Consciousness",
  "Behavioral/Violent",
  "Bleeding/Hemorrhage",
  "Burns",
  "Cardiac Arrest",
  "Cardiac (MI, Angina, CHF)",
  "CVA/TIA",
  "Diabetic",
  "Dizziness/Vertigo",
  "Dyspnea",
  "Electrocution",
  "Environmental Exposure",
  "Eye Problem",
  "Fall",
  "GI Problem",
  "GU Problem",
  "Headache",
  "Major Trauma",
  "Medical Device Problem",
  "MVC/MVA",
  "OB/GYN",
  "OD/Poisoning/Drug Abuse",
  "Pain (Non-specified)",
  "Respiratory Arrest",
  "Seizure",
  "Syncope/Near Syncope",
  "Unconscious/Unresponsive",
  "Other",
  "Obvious Death",
]

export default function PatientDetailsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    symptoms: [] as string[],
    consciousness: "",
    pupils: "",
    skinCondition: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredSymptoms = symptoms.filter((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: checked ? [...prev.symptoms, symptom] : prev.symptoms.filter((s) => s !== symptom),
    }))
  }

  const isFormComplete = () => {
    return (
      formData.age &&
      formData.gender &&
      formData.symptoms.length > 0 &&
      formData.consciousness &&
      formData.pupils &&
      formData.skinCondition
    )
  }

  const handleNext = () => {
    if (isFormComplete()) {
      localStorage.setItem("patientData", JSON.stringify(formData))
      router.push("/patient-details-2")
    }
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-xl font-semibold text-center mb-8">Patient Details</h1>

        <div className="space-y-4">
          <Select value={formData.age} onValueChange={(value) => setFormData((prev) => ({ ...prev, age: value }))}>
            <SelectTrigger className="bg-gray-100 border-0 rounded-xl h-14">
              <SelectValue placeholder="Age Range" />
            </SelectTrigger>
            <SelectContent>
              {["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81+"].map((age) => (
                <SelectItem key={age} value={age}>
                  {age}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.gender}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
          >
            <SelectTrigger className="bg-gray-100 border-0 rounded-xl h-14">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <div className="bg-gray-100 rounded-xl p-4 cursor-pointer flex justify-between items-center h-14">
                <span className={formData.symptoms.length > 0 ? "text-black" : "text-gray-500"}>
                  {formData.symptoms.length > 0 ? formData.symptoms.join(", ") : "Primary Symptom(s)"}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-sm max-h-[80vh] flex flex-col">
              <DialogHeader className="flex flex-row items-center justify-between">
                <DialogTitle>Primary Symptom(s)</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setFormData((prev) => ({ ...prev, symptoms: [] }))}>
                  Clear
                </Button>
              </DialogHeader>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-100 border-0"
                />
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredSymptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-3 py-2">
                    <Checkbox
                      checked={formData.symptoms.includes(symptom)}
                      onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                    />
                    <label className="text-sm cursor-pointer flex-1">{symptom}</label>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <div>
            <h3 className="text-sm font-medium mb-3 text-left">Level of Consciousness</h3>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setFormData((prev) => ({ ...prev, consciousness: level.toString() }))}
                  className={`w-12 h-12 rounded-xl font-medium transition-colors ${
                    formData.consciousness === level.toString()
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <Select
            value={formData.pupils}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, pupils: value }))}
          >
            <SelectTrigger className="bg-gray-100 border-0 rounded-xl h-14">
              <SelectValue placeholder="Pupils" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Dilated">Dilated</SelectItem>
              <SelectItem value="Constricted">Constricted</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={formData.skinCondition}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, skinCondition: value }))}
          >
            <SelectTrigger className="bg-gray-100 border-0 rounded-xl h-14">
              <SelectValue placeholder="Skin Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Pale">Pale</SelectItem>
              <SelectItem value="Cyanotic">Cyanotic</SelectItem>
              <SelectItem value="Flushed">Flushed</SelectItem>
              <SelectItem value="Jaundiced">Jaundiced</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleNext}
            disabled={!isFormComplete()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium mt-8"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
