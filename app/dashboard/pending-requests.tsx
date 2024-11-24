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

export default function PendingRequests({
  requests,
}: {
  requests: RequestWithUserDetails[]
}) {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

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
                <img
                  src={`data:image/png;base64,${Buffer.from(req.cv).toString("base64")}`}
                  alt="CV"
                  className="w-24 h-24 object-cover"
                />
                <img
                  src={`data:image/png;base64,${Buffer.from(req.diplomas).toString(
                    "base64"
                  )}`}
                  alt="Diploma"
                  className="w-24 h-24 object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button>Approve</Button>
              <Button variant="destructive">Reject</Button>
            </CardFooter>
          </Card>
        )
      })}
      <ConfirmationModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={() => {}}
        title="Approve Post"
        message="Are you sure you want to approve this post?"
      />
      <ConfirmationModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={() => {}}
        title="Reject Post"
        message="Are you sure you want to reject this post?"
      />
    </div>
  )
}
