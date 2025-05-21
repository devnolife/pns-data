"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import UserDashboardLayout from "@/components/layouts/user-dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Mail, Building, Phone, Shield, Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    training: "",
    class: "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }

    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: "0812345678", // Mock data
        institution: "Ministry of Education", // Mock data
        training: user.training || "",
        class: user.class || "",
      })
    }
  }, [isAuthenticated, loading, router, user])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setUpdating(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1500)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setError("")

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      setUpdating(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setUpdating(false)
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1500)
  }

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <UserDashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
          <p className="text-gray-600 mt-1">View and update your personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/diverse-avatars.png" alt={user?.name || "User"} />
                  <AvatarFallback className="text-2xl">
                    {user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user?.name || user?.username}</h2>
                <p className="text-gray-500 mt-1">{user?.training} Participant</p>
                <p className="text-gray-500 text-sm">Class: {user?.class}</p>

                <div className="w-full mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center mb-3">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">0812345678</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">Ministry of Education</span>
                  </div>
                </div>

                <div className="w-full mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">Account created: May 10, 2024</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="password">Change Password</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <form onSubmit={handleProfileSubmit}>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="institution">Institution</Label>
                          <Input
                            id="institution"
                            name="institution"
                            value={profileData.institution}
                            onChange={handleProfileChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="training">Training Program</Label>
                          <Input
                            id="training"
                            name="training"
                            value={profileData.training}
                            onChange={handleProfileChange}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="class">Class</Label>
                          <Input
                            id="class"
                            name="class"
                            value={profileData.class}
                            onChange={handleProfileChange}
                            readOnly
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={updating}>
                        {updating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <form onSubmit={handlePasswordSubmit}>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>Update your account password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={updating}>
                        {updating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Change Password"
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  )
}
