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
      message: "Nama harus minimal 2 karakter.",
    }),
    training: z.string({
      required_error: "Silakan pilih program pelatihan.",
    }),
    class: z.string().min(1, {
      message: "Kelas wajib diisi.",
    }),
    phone: z
      .string()
      .min(10, {
        message: "Nomor telepon harus minimal 10 digit.",
      })
      .regex(/^\d+$/, {
        message: "Nomor telepon hanya boleh berisi angka.",
      }),
    email: z.string().email({
      message: "Silakan masukkan alamat email yang valid.",
    }),
    password: z.string().min(8, {
      message: "Kata sandi harus minimal 8 karakter.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
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
        title: "Pendaftaran berhasil",
        description: "Akun Anda telah dibuat. Anda sekarang dapat masuk.",
      })

      // Redirect to login page after a delay
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      toast({
        title: "Pendaftaran gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat pendaftaran",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    "Akses ke koleksi digital yang komprehensif",
    "Penyimpanan dan pengelolaan dokumen yang aman",
    "Pengiriman dan pelacakan laporan yang mudah",
    "Kolaborasi dengan profesional lainnya",
    "Tetap diperbarui dengan sumber daya terbaru",
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
            <h1 className="text-4xl font-bold mb-4">Bergabung dengan DigiCollect</h1>
            <p className="text-xl opacity-90 mb-8">
              Gerbang Anda untuk pengelolaan koleksi digital yang komprehensif dan pengembangan profesional.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Mengapa Mendaftar?</h2>
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
              Sudah memiliki akun?{" "}
              <Link href="/login" className="underline font-medium hover:text-white">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8 bg-background">
        <div className="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Buat akun Anda</h2>
            <p className="mt-2 text-muted-foreground">Isi detail Anda untuk memulai dengan DigiCollect</p>
          </div>

          {registrationComplete ? (
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Pendaftaran Selesai!</h3>
                <p className="text-muted-foreground mb-6">
                  Akun Anda telah berhasil dibuat. Anda akan dialihkan ke halaman login sebentar lagi.
                </p>
                <Button onClick={() => router.push("/login")} className="w-full">
                  Pergi ke Login <ArrowRight className="ml-2 h-4 w-4" />
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
                        <FormLabel>Nama Lengkap</FormLabel>
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
                          <Input placeholder="anda@contoh.com" {...field} />
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
                        <FormLabel>Pelatihan yang Diikuti</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih pelatihan" />
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
                        <FormLabel>Kelas</FormLabel>
                        <FormControl>
                          <Input placeholder="Kelas Anda" {...field} />
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
                        <FormLabel>Nomor Telepon</FormLabel>
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
                        <FormLabel>Kata Sandi</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>Minimal 8 karakter</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Kata Sandi</FormLabel>
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
                      Membuat akun...
                    </>
                  ) : (
                    "Buat akun"
                  )}
                </Button>

                <div className="text-center mt-6 lg:hidden">
                  <p className="text-sm text-muted-foreground">
                    Sudah memiliki akun?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                      Masuk
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
            <DialogTitle>Konfirmasi Pendaftaran</DialogTitle>
            <DialogDescription>
              Silakan konfirmasi bahwa Anda ingin mendaftar dengan informasi yang diberikan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Nama:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Pelatihan:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().training}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Kelas:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().class}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Telepon:</p>
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
              Batal
            </Button>
            <Button onClick={() => handleConfirmRegistration(true)}>Konfirmasi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
