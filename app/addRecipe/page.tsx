"use client"
import Navbar from "@/components/navbar"
import Recipe_Form from "@/components/Recipe_Form"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Loading from "@/components/loading"

export default function Page() {
  const { data: session, status } = useSession()

  if (status === "loading") return <Loading />

  if (!session || session.user.role !== "CHEF") redirect("/")

  return (
    <div className="w-full bg-primary-to-white from-primary to-white min-h-screen">
      <div className="container mx-auto ">
        <Navbar />
        <div className="min-h-screen  flex flex-col items-center justify-center p-4">
          <Recipe_Form />;
        </div>
      </div>
    </div>
  )
}
