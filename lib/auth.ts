import { cookies } from "next/headers"

const ADMIN_TOKEN = process.env.ADMIN_TOKEN
const AUTH_COOKIE_NAME = "quotelinker_admin_token"

export async function isAuthenticated(): Promise<boolean> {
  if (!ADMIN_TOKEN) {
    console.warn("[v0] ADMIN_TOKEN not configured")
    return false
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)

  return token?.value === ADMIN_TOKEN
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}

export function validateToken(token: string): boolean {
  return token === ADMIN_TOKEN
}
