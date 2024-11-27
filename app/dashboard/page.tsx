"use client"

import { useEffect, useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useGetAllRequests } from "@/hooks/useGetAllRequests"
import { toast } from "@/hooks/use-toast"
import PendingRequests from "./pending-requests"
import ApprovedRequests from "./approved-requests"
import RejectedRequests from "./rejected-requests"
import { RequestWithUserDetails } from "../types/types"
import Navbar from "@/components/navbar"

export default function Page() {
  const requests: RequestWithUserDetails[] = useGetAllRequests().data
  const router = useRouter()
  const { error, isLoading } = useGetAllRequests()
  const { data: session } = useSession()
  const userRole = session?.user.role
  const [activeTab, setActiveTab] = useState("pending")

  useEffect(() => {
    if (!session || userRole !== "ADMIN") {
      router.push("/")
    }
  }, [session, userRole, router])

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to get requests",
        variant: "destructive",
      })
    }
  }, [error])

  const pendingRequests = useMemo(
    () => requests?.filter((req) => req.state === "PENDING"),
    [requests]
  )
  const approvedRequests = useMemo(
    () => requests?.filter((req) => req.state === "APPROVED"),
    [requests]
  )
  const rejectedRequests = useMemo(
    () => requests?.filter((req) => req.state === "REJECTED"),
    [requests]
  )

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="w-full bg-primary-to-white from-primary to-white min-h-screen">
      <div className="container mx-auto p-6">
        <Navbar />
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
    </div>
  )
}
