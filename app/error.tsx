"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[v0] Error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />
        <h2 className="mt-4 text-2xl font-semibold">Something went wrong!</h2>
        <p className="mt-2 text-muted-foreground">We're sorry, but something unexpected happened.</p>
        <div className="mt-8">
          <Button onClick={reset}>Try Again</Button>
        </div>
      </div>
    </div>
  )
}
