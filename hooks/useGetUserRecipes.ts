import { useQuery } from "@tanstack/react-query"

const fetchUserRecipes = async (userId: string) => {
  const response = await fetch("/api/getUserRecipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  })

  if (!response.ok) {
    throw new Error("Failed to get user recipes")
  }

  return response.json()
}

export const useGetUserRecipes = (userId: string) => {
  console.log("userID : ", userId)
  return useQuery({
    queryKey: ["userRecipes", userId],
    queryFn: () => fetchUserRecipes(userId),
    enabled: !!userId, // Only run the query if userId is available
  })
}
