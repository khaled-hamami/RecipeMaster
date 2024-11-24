"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useGetAllRequests } from "@/hooks/useGetAllRequests"
import { toast } from "@/hooks/use-toast"
import PendingRequests from "./pending-requests"
import ApprovedRequests from "./approved-requests"
import RejectedRequests from "./rejected-requests"
import { RequestWithUserDetails } from "../types/requestWithUserDetails"

export default function DashboardPage() {
  const requests: RequestWithUserDetails[] = useGetAllRequests().data
  const { error, isLoading } = useGetAllRequests()

  const { data: session } = useSession()
  const userRole = session?.user.role

  if (!session || userRole !== "ADMIN") redirect("/")

  const [activeTab, setActiveTab] = useState("pending")

  const pendingRequests = requests?.filter((req) => req.state === "PENDING")
  const approvedRequests = requests?.filter((req) => req.state === "APPROVED")
  const rejectedRequests = requests?.filter((req) => req.state === "REJECTED")

  if (isLoading) return <div>Loading...</div>
  if (error)
    toast({
      title: "Error",
      description: "Failed to get requests",
      variant: "destructive",
    })
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <PendingRequests requests={pendingRequests} />
        </TabsContent>
        <TabsContent value="approved">
          <ApprovedRequests requests={approvedRequests} />
        </TabsContent>
        <TabsContent value="rejected">
          <RejectedRequests requests={rejectedRequests} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
