"use client"

import { useState, useEffect } from "react"
import { AdminAuthGuard } from "@/components/admin-auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Lead, LeadStatus } from "@/lib/types"

function LeadDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [lead, setLead] = useState<Lead | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form state
  const [status, setStatus] = useState<LeadStatus>("new")
  const [bound, setBound] = useState(false)
  const [boundPremium, setBoundPremium] = useState("")
  const [carrier, setCarrier] = useState("")
  const [policyId, setPolicyId] = useState("")
  const [boundDate, setBoundDate] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    fetchLead()
  }, [params.id])

  const fetchLead = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/leads?limit=1`)
      const data = await response.json()

      // Find the specific lead (in production, you'd have a dedicated endpoint)
      const foundLead = data.leads.find((l: Lead) => l.id === params.id)

      if (!foundLead) {
        setError("Lead not found")
        return
      }

      setLead(foundLead)
      setStatus(foundLead.status)
      setBound(foundLead.bound)
      setBoundPremium(foundLead.bound_premium?.toString() || "")
      setCarrier(foundLead.carrier || "")
      setPolicyId(foundLead.policy_id || "")
      setBoundDate(foundLead.bound_date || "")
      setNotes(foundLead.notes || "")
    } catch (err) {
      console.error("[v0] Failed to fetch lead:", err)
      setError("Failed to load lead")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: params.id,
          status,
          bound,
          bound_premium: boundPremium ? Number.parseFloat(boundPremium) : null,
          carrier: carrier || null,
          policy_id: policyId || null,
          bound_date: boundDate || null,
          notes: notes || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update lead")
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("[v0] Failed to update lead:", err)
      setError("Failed to save changes")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (error && !lead) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!lead) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Leads
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Lead Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Lead Information (Read-only) */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Information</CardTitle>
              <CardDescription>Submitted on {new Date(lead.created_at).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">First Name</Label>
                  <p className="font-medium">{lead.first_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Name</Label>
                  <p className="font-medium">{lead.last_name}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{lead.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Phone</Label>
                <p className="font-medium">{lead.phone}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-muted-foreground">ZIP</Label>
                  <p className="font-medium">{lead.zip}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">City</Label>
                  <p className="font-medium">{lead.city}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">State</Label>
                  <p className="font-medium">{lead.state}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Line of Business</Label>
                <p className="font-medium capitalize">{lead.line_of_business}</p>
              </div>
              {lead.commercial_type && (
                <div>
                  <Label className="text-muted-foreground">Commercial Type</Label>
                  <p className="font-medium">{lead.commercial_type}</p>
                </div>
              )}
              {(lead.utm_source || lead.utm_medium || lead.utm_campaign || lead.gclid) && (
                <div>
                  <Label className="text-muted-foreground">Attribution</Label>
                  <div className="mt-1 space-y-1 text-sm">
                    {lead.utm_source && <p>Source: {lead.utm_source}</p>}
                    {lead.utm_medium && <p>Medium: {lead.utm_medium}</p>}
                    {lead.utm_campaign && <p>Campaign: {lead.utm_campaign}</p>}
                    {lead.gclid && <p>GCLID: {lead.gclid}</p>}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Fields (Editable) */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
              <CardDescription>Update lead status and policy information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as LeadStatus)}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="quoted">Quoted</SelectItem>
                    <SelectItem value="bound">Bound</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="bound" checked={bound} onCheckedChange={(checked) => setBound(checked === true)} />
                <Label htmlFor="bound" className="font-normal">
                  Policy Bound
                </Label>
              </div>

              {bound && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="bound_premium">Bound Premium ($)</Label>
                    <Input
                      id="bound_premium"
                      type="number"
                      step="0.01"
                      value={boundPremium}
                      onChange={(e) => setBoundPremium(e.target.value)}
                      placeholder="1500.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carrier">Carrier</Label>
                    <Input
                      id="carrier"
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      placeholder="State Farm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="policy_id">Policy ID</Label>
                    <Input
                      id="policy_id"
                      value={policyId}
                      onChange={(e) => setPolicyId(e.target.value)}
                      placeholder="POL-123456"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bound_date">Bound Date</Label>
                    <Input
                      id="bound_date"
                      type="date"
                      value={boundDate}
                      onChange={(e) => setBoundDate(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about this lead..."
                  rows={4}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>Changes saved successfully!</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleSave}
                className="w-full bg-[#00EEFD] text-[#0F172A] hover:bg-[#00EEFD]/90"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  return (
    <AdminAuthGuard>
      <LeadDetail params={params} />
    </AdminAuthGuard>
  )
}
