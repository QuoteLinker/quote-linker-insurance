import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"
import { isAuthenticated } from "@/lib/auth"

export async function GET(request: NextRequest) {
  // Check authentication
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "50", 10)
    const state = searchParams.get("state")
    const city = searchParams.get("city")
    const lineOfBusiness = searchParams.get("line_of_business")
    const status = searchParams.get("status")
    const bound = searchParams.get("bound")
    const sortBy = searchParams.get("sort_by") || "created_at"
    const sortOrder = searchParams.get("sort_order") || "desc"

    const supabase = await createServerClient()
    let query = supabase.from("leads").select("*", { count: "exact" })

    // Apply filters
    if (state) {
      query = query.eq("state", state.toUpperCase())
    }
    if (city) {
      query = query.ilike("city", `%${city}%`)
    }
    if (lineOfBusiness) {
      query = query.eq("line_of_business", lineOfBusiness)
    }
    if (status) {
      query = query.eq("status", status)
    }
    if (bound !== null && bound !== undefined) {
      query = query.eq("bound", bound === "true")
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === "asc" })

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: leads, error, count } = await query

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
    }

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  // Check authentication
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 })
    }

    // Only allow updating specific fields
    const allowedFields = ["status", "bound", "bound_premium", "carrier", "policy_id", "bound_date", "notes"]

    const filteredUpdates: any = {}
    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key]
      }
    })

    const supabase = await createServerClient()
    const { data: lead, error } = await supabase.from("leads").update(filteredUpdates).eq("id", id).select().single()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
    }

    return NextResponse.json({ lead })
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
