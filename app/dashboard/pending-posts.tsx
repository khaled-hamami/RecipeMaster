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

type Post = {
  id: number
  userId: string
  userName: string
  profilePic: string
  cvUrl: string
  diplomaUrl: string
  status: "pending" | "approved" | "rejected"
}

type PendingPostsProps = {
  posts: Post[]
  onStatusChange: (postId: number, newStatus: "approved" | "rejected") => void
}

export function PendingPosts({ posts, onStatusChange }: PendingPostsProps) {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  const handleApprove = (postId: number) => {
    setSelectedPostId(postId)
    setIsApproveModalOpen(true)
  }

  const handleReject = (postId: number) => {
    setSelectedPostId(postId)
    setIsRejectModalOpen(true)
  }

  const confirmApprove = () => {
    if (selectedPostId) {
      onStatusChange(selectedPostId, "approved")
    }
    setIsApproveModalOpen(false)
  }

  const confirmReject = () => {
    if (selectedPostId) {
      onStatusChange(selectedPostId, "rejected")
    }
    setIsRejectModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.profilePic} alt={post.userName} />
                <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{post.userName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>User ID: {post.userId}</p>
            <div className="flex space-x-4 mt-4">
              <img src={post.cvUrl} alt="CV" className="w-24 h-24 object-cover" />
              <img
                src={post.diplomaUrl}
                alt="Diploma"
                className="w-24 h-24 object-cover"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button onClick={() => handleApprove(post.id)}>Approve</Button>
            <Button variant="destructive" onClick={() => handleReject(post.id)}>
              Reject
            </Button>
          </CardFooter>
        </Card>
      ))}
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
