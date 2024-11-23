import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"

const deleteRecipe = async (recipeId: string) => {
  try {
    const response = await fetch("/api/deleteRecipe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId }),
    })

    if (!response.ok) {
      throw new Error("Failed to delete the recipe")
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred")
    } else {
      throw new Error("An unknown error occurred")
    }
  }
}

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      toast({
        title: "Recipe deleted",
        description: "The recipe has been deleted successfully.",
      })
      queryClient.invalidateQueries({ queryKey: ["userRecipes"] })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}
