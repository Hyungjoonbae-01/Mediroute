import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Hero Image */}
        <div className="h-64 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">MediRoute</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Welcome to MediRoute</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Optimize patient transport using real-time hospital data and smart routing.
          </p>

          <Link href="/patient-details">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium">
              Sign in
            </Button>
          </Link>

          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
