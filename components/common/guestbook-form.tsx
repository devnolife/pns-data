"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createGuestbookEntryAction } from "@/lib/actions/guestbook"
import { usePublicAccess } from "@/hooks/use-public-access"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  message: z.string().min(1, {
    message: "Pesan diperlukan.",
  }),
  institution: z.string().min(2, {
    message: "Asal instansi harus minimal 2 karakter.",
  }),
  membership: z.enum(["Pegawai Pusjar", "Peserta PKA", "Peserta PKP", "Peserta PKN", "Peserta Latsar CPNS", "Tamu"], {
    message: "Silakan pilih jenis keanggotaan.",
  }),
  visitPurpose: z.enum(["Mencari referensi laporan", "Berkunjung", "lainnya"], {
    message: "Silakan pilih tujuan kunjungan.",
  }),
  otherPurpose: z.string().optional(),
})

interface GuestbookFormProps {
  onSubmitSuccess?: () => void
}

export function GuestbookForm({ onSubmitSuccess }: GuestbookFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { grantAccess } = usePublicAccess()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      institution: "",
      membership: undefined,
      visitPurpose: undefined,
      otherPurpose: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const result = await createGuestbookEntryAction({
        name: values.name,
        email: values.email || undefined,
        message: values.message,
        institution: values.institution,
        membership: values.membership,
        visitPurpose: values.visitPurpose === "lainnya" ? values.otherPurpose : values.visitPurpose,
      })

      if (result.error) {
        toast({
          title: "Terjadi kesalahan.",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      // Use the centralized access management
      if (typeof window !== 'undefined' && result.sessionToken) {
        grantAccess(result.sessionToken, values.name)
      }

      // Call the onSubmitSuccess callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess()
      }

      toast({
        title: "🎉 Terima kasih telah mengisi buku tamu!",
        description: "Pesan Anda telah tercatat. Sekarang Anda dapat mengakses koleksi digital selama 3 jam! ⏰",
        duration: 6000,
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Terjadi kesalahan.",
        description: "Pesan Anda tidak dapat dikirim. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Nama
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama lengkap"
                      className="border border-gray-300 focus:border-primary rounded-md h-10 bg-white"
                      {...field}
                    />
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
                  <FormLabel className="text-gray-700 font-medium">
                    Email <span className="text-xs text-gray-500">(opsional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan alamat email"
                      className="border border-gray-300 focus:border-primary rounded-md h-10 bg-white"
                      {...field}
                    />
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
                  <FormLabel className="text-gray-700 font-medium">
                    Asal Instansi
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama instansi asal"
                      className="border border-gray-300 focus:border-primary rounded-md h-10 bg-white"
                      {...field}
                    />
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
                  <FormLabel className="text-gray-700 font-medium">
                    Keanggotaan
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-gray-300 focus:border-primary rounded-md h-10 bg-white">
                        <SelectValue placeholder="Pilih jenis keanggotaan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-md border-gray-300">
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
                  <FormLabel className="text-gray-700 font-medium">
                    Tujuan Kunjungan
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-gray-300 focus:border-primary rounded-md h-10 bg-white">
                        <SelectValue placeholder="Pilih tujuan kunjungan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-md border-gray-300">
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
                    <FormLabel className="text-gray-700 font-medium">
                      Tujuan Lainnya
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jelaskan tujuan kunjungan"
                        className="border border-gray-300 focus:border-primary rounded-md h-10 bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Pesan
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tuliskan pesan atau kesan Anda"
                      className="min-h-[120px] border border-gray-300 focus:border-primary rounded-md bg-white resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Mengirim pesan...</span>
              </>
            ) : (
              <span>Kirim Pesan</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
