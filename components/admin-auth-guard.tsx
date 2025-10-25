"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { Lock } from "lucide-react"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [token, setToken] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Check if already authenticated (token in localStorage)
    const storedToken = localStorage.getItem("admin_token")
    if (storedToken) {
      verifyToken(storedToken)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenToVerify }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        localStorage.setItem("admin_token", tokenToVerify)
      } else {
        setIsAuthenticated(false)
        localStorage.removeItem("admin_token")
      }
    } catch (err) {
      console.error("[v0] Auth verification error:", err)
      setIsAuthenticated(false)
      localStorage.removeItem("admin_token")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        localStorage.setItem("admin_token", token)
        setIsAuthenticated(true)
      } else {
        setError("Invalid access token. Please try again.")
      }
    } catch (err) {
      console.error("[v0] Auth error:", err)
      setError("Authentication failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  // Not authenticated - show login form
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00EEFD]/10">
              <Lock className="h-6 w-6 text-[#00EEFD]" />
            </div>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter your access token to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">Access Token</Label>
                <Input
                  id="token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter admin token"
                  required
                  autoFocus
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-[#00EEFD] text-[#0F172A] hover:bg-[#00EEFD]/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Authenticating...
                  </>
                ) : (
                  "Access Admin"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Authenticated - show children
  return <>{children}</>
}
