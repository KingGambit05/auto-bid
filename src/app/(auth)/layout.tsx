import { Gavel } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50">
      {/* Simple header for auth pages */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Gavel className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
            <span className="text-lg sm:text-xl font-bold text-black">AutoBID</span>
          </Link>
          <Link 
            href="/" 
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Auth content */}
      <main className="flex items-center justify-center min-h-screen p-4">
        {children}
      </main>
    </div>
  )
}