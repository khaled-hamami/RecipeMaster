"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RequestWithUserDetails } from "../types/requestWithUserDetails"

export default function RejectedRequests({
  requests,
}: {
  requests: RequestWithUserDetails[]
}) {
  return requests.length === 0 ? (
    <div>No rejected requests</div>
  ) : (
    <div className="space-y-6">
      {requests.map((req) => (
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
              <span>{req.userId}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>User ID: {req.userId}</p>
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
        </Card>
      ))}
    </div>
  )
}
