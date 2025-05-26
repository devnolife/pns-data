"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock API client since we don't have access to the real one
const mockApiClient = {
  submitGuestbookEntry: async (data: any) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 1000)
    })
  },
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  institution: z.string().min(2, {
    message: "Institution must be at least 2 characters.",
  }),
  membership: z.enum(["Pegawai Pusjar", "Peserta PKA", "Peserta PKP", "Peserta PKN", "Peserta Latsar CPNS", "Tamu"], {
    message: "Please select a membership type.",
  }),
  visitPurpose: z.enum(["Mencari referensi laporan", "Berkunjung", "lainnya"], {
    message: "Please select a visit purpose.",
  }),
  otherPurpose: z.string().optional(),
})

export function GuestbookForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      institution: "",
      membership: undefined,
      visitPurpose: undefined,
      otherPurpose: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await mockApiClient.submitGuestbookEntry(values)
      toast({
        title: "Thank you for signing our guestbook!",
        description: "Your message has been recorded.",
      })
      form.reset()
      router.push("/public-collections")
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your message could not be submitted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-card">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asal Instansi</FormLabel>
                  <FormControl>
                    <Input placeholder="Asal instansi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="membership"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keanggotaan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih keanggotaan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pegawai Pusjar">Pegawai Pusjar</SelectItem>
                      <SelectItem value="Peserta PKA">Peserta PKA</SelectItem>
                      <SelectItem value="Peserta PKP">Peserta PKP</SelectItem>
                      <SelectItem value="Peserta PKN">Peserta PKN</SelectItem>
                      <SelectItem value="Peserta Latsar CPNS">Peserta Latsar CPNS</SelectItem>
                      <SelectItem value="Tamu">Tamu</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visitPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tujuan Kunjungan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tujuan kunjungan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mencari referensi laporan">Mencari referensi laporan</SelectItem>
                      <SelectItem value="Berkunjung">Berkunjung</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("visitPurpose") === "lainnya" && (
              <FormField
                control={form.control}
                name="otherPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tujuan Lainnya</FormLabel>
                    <FormControl>
                      <Input placeholder="Sebutkan tujuan kunjungan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Sign Guestbook"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
