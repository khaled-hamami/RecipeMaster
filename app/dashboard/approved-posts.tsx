'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Post = {
  id: number
  userId: string
  userName: string
  profilePic: string
  cvUrl: string
  diplomaUrl: string
  status: 'pending' | 'approved' | 'rejected'
}

type ApprovedPostsProps = {
  posts: Post[]
}

export function ApprovedPosts({ posts }: ApprovedPostsProps) {
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
              <img src={post.diplomaUrl} alt="Diploma" className="w-24 h-24 object-cover" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

