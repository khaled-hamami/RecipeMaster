"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ConfirmationModal } from "./confirmation-model"
import { RequestWithUserDetails } from "../types/requestWithUserDetails"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

export default function PendingRequests({
  requests,
}: {
  requests: RequestWithUserDetails[]
}) {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [selectedReqId, setSelectedReqId] = useState<string | null>(null)

  const handleApprove = (reqId: string) => {
    setSelectedReqId(reqId)
    setIsApproveModalOpen(true)
  }

  const handleReject = (reqId: string) => {
    setSelectedReqId(reqId)
    setIsRejectModalOpen(true)
  }

  const confirmApprove = async () => {
    if (selectedReqId) {
      const response = await fetch("/api/approveRequest", {
        method: "POST",
        body: JSON.stringify({ requestId: selectedReqId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200)
        toast({
          title: "Success",
          description: "Request approved",
        })
      else
        toast({
          title: "Error",
          description: "Failed to approve request",
          variant: "destructive",
        })
    }
    setIsApproveModalOpen(false)
  }

  const confirmReject = async () => {
    if (selectedReqId) {
      const response = await fetch("/api/rejectRequest", {
        method: "POST",
        body: JSON.stringify({ requestId: selectedReqId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200)
        toast({
          title: "Success",
          description: "Request rejected",
        })
      else
        toast({
          title: "Error",
          description: "Failed to reject request",
          variant: "destructive",
        })
    }
    setIsRejectModalOpen(false)
  }

  return requests.length === 0 ? (
    <div>No pending requests</div>
  ) : (
    <div className="space-y-6">
      {requests.map((req) => {
        return (
          <Card key={req.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={req.userDetails?.image || ""}
                    alt={req.userDetails?.name || "User"}
                  />
                  <AvatarFallback>{req.userDetails?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{req.userDetails?.name || req.userId}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>User ID: {req.userId}</p>
              <p>Name: {req.userDetails?.name}</p>
              <p>Email: {req.userDetails?.email}</p>
              <div className="flex space-x-4 mt-4">
                <Image
                  src={`data:image/png;base64,${Buffer.from(req.cv).toString("base64")}`}
                  alt="CV"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover"
                />
                <Image
                  src={`data:image/png;base64,${Buffer.from(req.diplomas).toString(
                    "base64"
                  )}`}
                  alt="Diploma"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button onClick={() => handleApprove(req.id)}>Approve</Button>
              <Button variant="destructive" onClick={() => handleReject(req.id)}>
                Reject
              </Button>
            </CardFooter>
          </Card>
        )
      })}
      <ConfirmationModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={confirmApprove}
        title="Approve Post"
        message="Are you sure you want to approve this post?"
      />
      <ConfirmationModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={confirmReject}
        title="Reject Post"
        message="Are you sure you want to reject this post?"
      />
    </div>
  )
}
