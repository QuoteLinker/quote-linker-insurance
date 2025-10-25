import { type NextRequest, NextResponse } from "next/server"
import { validateToken, setAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    if (!validateToken(token)) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    await setAuthCookie(token)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
