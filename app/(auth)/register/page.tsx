"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    training: z.string({
      required_error: "Please select a training program.",
    }),
    class: z.string().min(1, {
      message: "Class is required.",
    }),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 digits.",
      })
      .regex(/^\d+$/, {
        message: "Phone number must contain only digits.",
      }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      training: "",
      class: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setConfirmDialogOpen(true)
  }

  const handleConfirmRegistration = async (confirm: boolean) => {
    setConfirmDialogOpen(false)

    if (!confirm) return

    setLoading(true)

    try {
      // In a real app, this would be a fetch call to your API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.getValues()),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Registration failed")
      }

      setRegistrationComplete(true)

      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      })

      // Redirect to login page after a delay
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    "Access to comprehensive digital collections",
    "Secure document storage and management",
    "Easy report submission and tracking",
    "Collaboration with other professionals",
    "Stay updated with the latest resources",
  ]

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Column - Visual/Benefits */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-primary/70 text-white">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/digital-library.png"
            alt="Digital Collection Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Join DigiCollect</h1>
            <p className="text-xl opacity-90 mb-8">
              Your gateway to comprehensive digital collection management and professional development.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Why Register?</h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 mr-3 flex-shrink-0 text-white" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8">
            <p className="text-sm opacity-80">
              Already have an account?{" "}
              <Link href="/login" className="underline font-medium hover:text-white">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8 bg-background">
        <div className="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
            <p className="mt-2 text-muted-foreground">Fill in your details to get started with DigiCollect</p>
          </div>

          {registrationComplete ? (
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Registration Complete!</h3>
                <p className="text-muted-foreground mb-6">
                  Your account has been created successfully. You will be redirected to the login page shortly.
                </p>
                <Button onClick={() => router.push("/login")} className="w-full">
                  Go to Login <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="training"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Training Attended</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select training" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PKN">PKN</SelectItem>
                            <SelectItem value="PKP">PKP</SelectItem>
                            <SelectItem value="PKA">PKA</SelectItem>
                            <SelectItem value="CPNS">CPNS Latsar</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <FormControl>
                          <Input placeholder="Your class" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="hidden md:block">{/* Spacer for grid alignment */}</div>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>At least 8 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>

                <div className="text-center mt-6 lg:hidden">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
            <DialogDescription>
              Please confirm that you want to register with the provided information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Name:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Training:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().training}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Class:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().class}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().email}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleConfirmRegistration(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleConfirmRegistration(true)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
