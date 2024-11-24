import { useQuery } from "@tanstack/react-query"

const fetchUserDetails = async (userId: string) => {
  const response = await fetch("/api/getUserDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  })

  if (!response.ok) {
    throw new Error("Failed to get user details")
  }

  return response.json()
}
export const useGetUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ["userDetails", userId],
    queryFn: () => fetchUserDetails(userId),
  })
}
