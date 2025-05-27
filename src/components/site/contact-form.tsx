"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean
    success: boolean
    message: string
  }>({
    submitted: false,
    success: false,
    message: "",
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setFormStatus({
        submitted: true,
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
      })

      // Reset form after successful submission
      form.reset()

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: "",
        })
      }, 5000)
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus({
        submitted: true,
        success: false,
        message: "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter subject (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your Message <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your message" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formStatus.submitted && (
          <Alert className={formStatus.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
            <AlertDescription className={formStatus.success ? "text-green-700" : "text-red-700"}>
              {formStatus.message}
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  )
}
