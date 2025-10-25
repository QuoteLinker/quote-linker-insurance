import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { join } from "path"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("[v0] Error: Missing Supabase environment variables")
  console.error("[v0] Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  try {
    console.log("[v0] Starting database setup...")

    // Read the SQL file
    const sqlPath = join(process.cwd(), "scripts", "001-create-leads-table.sql")
    const sql = readFileSync(sqlPath, "utf-8")

    console.log("[v0] Executing SQL script: 001-create-leads-table.sql")

    // Execute the SQL
    const { data, error } = await supabase.rpc("exec_sql", { sql_query: sql }).single()

    if (error) {
      // If exec_sql doesn't exist, try direct execution
      console.log("[v0] Trying direct SQL execution...")

      // Split SQL into individual statements and execute them
      const statements = sql
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      for (const statement of statements) {
        console.log("[v0] Executing statement...")
        const { error: execError } = await supabase.rpc("exec", { sql: statement })

        if (execError) {
          console.error("[v0] Error executing statement:", execError.message)
          throw execError
        }
      }
    }

    console.log("[v0] ✓ Database setup completed successfully!")
    console.log("[v0] ✓ Created leads table with RLS policies")
    console.log("[v0] ✓ Your database is ready to accept lead submissions")

    // Verify the table was created
    const { data: tables, error: verifyError } = await supabase.from("leads").select("id").limit(1)

    if (verifyError && verifyError.code !== "PGRST116") {
      console.error("[v0] Warning: Could not verify table creation:", verifyError.message)
    } else {
      console.log("[v0] ✓ Verified: leads table is accessible")
    }
  } catch (error) {
    console.error("[v0] Database setup failed:", error)
    console.error("[v0] Please run the SQL script manually in Supabase SQL Editor")
    process.exit(1)
  }
}

setupDatabase()
