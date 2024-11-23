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
import { CloudUpload, Paperclip } from "lucide-react"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload"
import { formSchema } from "@/Schemas/ChefRequestSchema"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const { toast } = useToast()
  const [cvFile, setCvFile] = useState<File[] | null>(null)
  const [diplomaFile, setDiplomaFile] = useState<File[] | null>(null)

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
    },
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diploma: new Uint8Array(),
      cv: new Uint8Array(),
    },
  })

  const handleCvFileChange = async (files: File[]) => {
    setCvFile(files)
    if (files.length > 0) {
      const file = files[0]
      const data = await file.arrayBuffer()
      form.setValue("cv", new Uint8Array(data))
    }
  }

  const handleDiplomaFileChange = async (files: File[]) => {
    setDiplomaFile(files)
    if (files.length > 0) {
      const file = files[0]
      const data = await file.arrayBuffer()
      form.setValue("diploma", new Uint8Array(data))
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      const response = await fetch("/api/createChefRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      if (response.status == 201) {
        toast({
          title: "Chef Request Submitted",
          description:
            "Your Chef request has been submited successfully, please wait for admin to verify it.",
          className: "bg-primary",
        })
        router.push("/profile")
      } else {
        toast({
          title: "Failed to submit the form",
          description: "An error occurred while submitting the form.",
          variant: "destructive",
          
        })
        console.error("Form submission error", response.statusText, response.status)
      }
    } catch (error) {
      console.error("Form submission error", error)
      toast({
        title: "Failed to submit the chef request",
        description: "An error occurred while communicating with the server.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="cv"
          render={() => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                <FileUploader
                  value={cvFile}
                  onValueChange={(file) => {
                    if (file) {
                      setCvFile(file)
                      handleCvFileChange(file)
                    }
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {cvFile &&
                      cvFile.length > 0 &&
                      cvFile.map((file, i) => (
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
          name="diploma"
          render={() => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                <FileUploader
                  value={diplomaFile}
                  onValueChange={(file) => {
                    if (file) {
                      setDiplomaFile(file)
                      handleDiplomaFileChange(file)
                    }
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {diplomaFile &&
                      diplomaFile.length > 0 &&
                      diplomaFile.map((file, i) => (
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
