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
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")

    const supabase = await createServerClient()
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false })

    // Apply date filters if provided
    if (startDate) {
      query = query.gte("created_at", startDate)
    }
    if (endDate) {
      query = query.lte("created_at", endDate)
    }

    const { data: leads, error } = await query

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
    }

    // Generate CSV
    const headers = [
      "ID",
      "Created At",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "ZIP",
      "City",
      "State",
      "Line of Business",
      "Commercial Type",
      "Status",
      "Bound",
      "Bound Premium",
      "Carrier",
      "Policy ID",
      "Bound Date",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "GCLID",
      "Notes",
    ]

    const csvRows = [headers.join(",")]

    leads?.forEach((lead) => {
      const row = [
        lead.id,
        lead.created_at,
        lead.first_name,
        lead.last_name,
        lead.email,
        lead.phone,
        lead.zip,
        lead.city,
        lead.state,
        lead.line_of_business,
        lead.commercial_type || "",
        lead.status,
        lead.bound,
        lead.bound_premium || "",
        lead.carrier || "",
        lead.policy_id || "",
        lead.bound_date || "",
        lead.utm_source || "",
        lead.utm_medium || "",
        lead.utm_campaign || "",
        lead.gclid || "",
        lead.notes ? `"${lead.notes.replace(/"/g, '""')}"` : "",
      ]
      csvRows.push(row.join(","))
    })

    const csv = csvRows.join("\n")
    const filename = `leads-export-${new Date().toISOString().split("T")[0]}.csv`

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
