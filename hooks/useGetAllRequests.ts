import { useQuery } from "@tanstack/react-query"
const fetchAllRequests = async () => {
  const response = await fetch("/api/getAllRequests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to get all requests")
  }

  return response.json()
}

export const useGetAllRequests = () => {
  return useQuery({
    queryKey: ["allRequests"],
    queryFn: fetchAllRequests,
  })
}
