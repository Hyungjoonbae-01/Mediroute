import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server"

// Make sure to set the GEMINI_API_KEY environment variable in your .env.local file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(req: NextRequest) {
  try {
    const patientData = await req.json()

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
      A patient has the following symptoms: "${patientData.symptoms}".

      Based only on these symptoms in the extreme, identify highly specialized or uncommon medical equipment that might be required for diagnosis or treatment. This equipment should NOT be standard in most hospitals.

      List ONLY the names of the uncommon equipment, separated by commas. Do not include explanations, headings, or common items like scalpels or gloves. Please give abbreviations for the equipment.

      For example: "MRI, Gamma Knife, da Vinci Surgical System, ECMO".
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ recommendation: text })
  } catch (error) {
    console.error("Error generating recommendation:", error)
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    )
  }
} 