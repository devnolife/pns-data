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

      // Set flag bahwa user sudah mengisi guestbook
      localStorage.setItem('hasFilledGuestbook', 'true')

      // Call the onSubmitSuccess callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess()
      }

      toast({
        title: "Terima kasih telah mengisi buku tamu!",
        description: "Pesan Anda telah tercatat. Sekarang Anda dapat mengakses koleksi digital!",
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
                  <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                    <span>👤</span> Nama
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Siapa nama Anda? ✨"
                      className="border-2 border-purple-200 focus:border-purple-400 rounded-xl h-12 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70"
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
                  <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                    <span>📧</span> Email <span className="text-xs text-gray-500">(opsional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan email jika mau! 💌"
                      className="border-2 border-purple-200 focus:border-purple-400 rounded-xl h-12 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70"
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
                  <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                    <span>🏢</span> Asal Instansi
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dari mana asal Anda? 🌍"
                      className="border-2 border-purple-200 focus:border-purple-400 rounded-xl h-12 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70"
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
                  <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                    <span>🎭</span> Keanggotaan
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400 rounded-xl h-12 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70">
                        <SelectValue placeholder="Pilih status Anda 🌈" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl border-purple-200">
                      <SelectItem value="Pegawai Pusjar" className="rounded-lg">🏢 Pegawai Pusjar</SelectItem>
                      <SelectItem value="Peserta PKA" className="rounded-lg">📚 Peserta PKA</SelectItem>
                      <SelectItem value="Peserta PKP" className="rounded-lg">🎓 Peserta PKP</SelectItem>
                      <SelectItem value="Peserta PKN" className="rounded-lg">📖 Peserta PKN</SelectItem>
                      <SelectItem value="Peserta Latsar CPNS" className="rounded-lg">🌟 Peserta Latsar CPNS</SelectItem>
                      <SelectItem value="Tamu" className="rounded-lg">👋 Tamu</SelectItem>
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
                  <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                    <span>🎯</span> Tujuan Kunjungan
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400 rounded-xl h-12 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70">
                        <SelectValue placeholder="Apa tujuan kunjungan Anda? 🚀" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl border-purple-200">
                      <SelectItem value="Mencari referensi laporan" className="rounded-lg">📊 Mencari referensi laporan</SelectItem>
                      <SelectItem value="Berkunjung" className="rounded-lg">👀 Berkunjung</SelectItem>
                      <SelectItem value="lainnya" className="rounded-lg">✨ Lainnya</SelectItem>
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
                    <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                      <span>💭</span> Tujuan Lainnya
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ceritakan lebih detail! 🌟"
                        className="border-2 border-purple-200 focus:border-purple-400 rounded-xl h-12 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70"
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
                  <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                    <span>💬</span> Pesan
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Bagikan pemikiran, perasaan, atau apapun! Biarkan kreativitas Anda mengalir... ✨💫🌈"
                      className="min-h-[120px] border-2 border-purple-200 focus:border-purple-400 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 resize-none"
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
            className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span className="text-lg">Mengirim pesan... ✨</span>
              </>
            ) : (
              <span className="text-lg flex items-center gap-2">
                <span>🚀</span>
                Kirim Pesan!
                <span>💫</span>
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
