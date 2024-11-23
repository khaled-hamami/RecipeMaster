'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PendingPosts } from './pending-posts'
import { ApprovedPosts } from './approved-posts'
import { RejectedPosts } from './rejected-posts'

type Post = {
  id: number
  userId: string
  userName: string
  profilePic: string
  cvUrl: string
  diplomaUrl: string
  status: 'pending' | 'approved' | 'rejected'
}

const allPosts: Post[] = [
  {
    id: 1,
    userId: "user123",
    userName: "John Doe",
    profilePic: "/placeholder.svg?height=40&width=40",
    cvUrl: "/placeholder.svg?height=100&width=100&text=CV",
    diplomaUrl: "/placeholder.svg?height=100&width=100&text=Diploma",
    status: 'pending'
  },
  {
    id: 2,
    userId: "user456",
    userName: "Jane Smith",
    profilePic: "/placeholder.svg?height=40&width=40",
    cvUrl: "/placeholder.svg?height=100&width=100&text=CV",
    diplomaUrl: "/placeholder.svg?height=100&width=100&text=Diploma",
    status: 'approved'
  },
  {
    id: 3,
    userId: "user789",
    userName: "Alice Johnson",
    profilePic: "/placeholder.svg?height=40&width=40",
    cvUrl: "/placeholder.svg?height=100&width=100&text=CV",
    diplomaUrl: "/placeholder.svg?height=100&width=100&text=Diploma",
    status: 'rejected'
  },
  // Add more posts as needed
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [posts, setPosts] = useState(allPosts)

  const pendingPosts = posts.filter(post => post.status === 'pending')
  const approvedPosts = posts.filter(post => post.status === 'approved')
  const rejectedPosts = posts.filter(post => post.status === 'rejected')

  const handleStatusChange = (postId: number, newStatus: 'approved' | 'rejected') => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: newStatus } : post
    ))
  }

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
          <PendingPosts posts={pendingPosts} onStatusChange={handleStatusChange} />
        </TabsContent>
        <TabsContent value="approved">
          <ApprovedPosts posts={approvedPosts} />
        </TabsContent>
        <TabsContent value="rejected">
          <RejectedPosts posts={rejectedPosts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

