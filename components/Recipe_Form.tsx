"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CloudUpload, Paperclip } from "lucide-react"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload"
import TagInput from "./ui/tag-input"
import { formSchema } from "@/Schemas/RecipeSchema"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function Recipe_Form() {
  const { toast } = useToast()
  const router = useRouter()

  const [files, setFiles] = useState<File[] | null>(null)

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
    },
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [] as Uint8Array[],
      ingredients: ["tomato"],
      instructions: "",
    },
  })
  const handleFileChange = async (files: File[]) => {
    setFiles(files)
    const imageArrays = await Promise.all(
      files.map(async (file) => {
        const imageBytes = await file.arrayBuffer()
        return new Uint8Array(imageBytes)
      })
    )
    form.setValue("images", imageArrays)
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/createRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      if (response.status == 201) {
        toast({
          title: "Recipe created",
          description: "Your recipe has been created successfully.",
        })
        router.push("/profile")
      } else {
        toast({
          title: "Failed to create recipe",
          description: "An error occurred while creating your recipe.",
          variant: "destructive",
        })
        console.error("Failed to create recipe", response.statusText, response.status)
      }
    } catch (error) {
      console.error("Form submission error", error)
      toast({
        title: "Failed to create recipe",
        description: "An error occurred while communicating with the server.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipes&apos;s name</FormLabel>
              <FormControl>
                <Input placeholder="Healthy Soup......" type="" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=" A healthy soup is a nutrient-dense, low-calorie meal...."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>mention extra stuff about your recipe</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={(files) => {
                    if (files) {
                      setFiles(files)
                      handleFileChange(files)
                    }
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>Select a file to upload.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <TagInput value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Press &apos; Enter &apos; after each ingredient to save it
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cooking instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="simmer a variety of vegetables, legumes, and lean protein...."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
