"use client"

import { useState } from "react"
import {
  Settings,
  User,
  Shield,
  Palette,
  Database,
  Bell,
  Globe,
  Mail,
  Download,
  Upload,
  Trash2,
  Save,
  RotateCcw,
  Moon,
  Sun,
  Monitor,
  Lock,
  Key,
  Smartphone,
  Zap,
  Crown,
  Sparkles,
  FolderOpen,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { fixFolderMappingAction } from "@/lib/actions/admin"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isFixingFolders, setIsFixingFolders] = useState(false)
  const [settings, setSettings] = useState({
    profile: {
      name: "Administrator",
      email: "admin@digicollect.com",
      bio: "Super Admin of DigiCollect Platform",
      timezone: "Asia/Jakarta",
      language: "id",
    },
    security: {
      twoFactorEnabled: true,
      sessionTimeout: "24",
      passwordExpiry: "90",
      ipWhitelist: true,
    },
    appearance: {
      theme: "system",
      accentColor: "purple",
      compactMode: false,
      animations: true,
    },
    notifications: {
      email: true,
      push: true,
      desktop: false,
      sound: true,
      digest: "daily",
    },
    system: {
      autoBackup: true,
      maintenanceMode: false,
      debugMode: false,
      analyticsTracking: true,
    },
  })

  const [activeTab, setActiveTab] = useState("profile")

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  const saveSettings = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", settings)
    // Show success toast
  }

  const resetSettings = () => {
    // Reset to default values
    console.log("Resetting settings")
  }

  const handleFixFolderMapping = async () => {
    setIsFixingFolders(true)
    try {
      const result = await fixFolderMappingAction()

      if (result.success) {
        toast({
          title: "✅ Folder Mapping Fixed",
          description: result.message,
          duration: 5000,
        })
      } else {
        toast({
          title: "❌ Error",
          description: result.message || "Failed to fix folder mapping",
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      console.error('Error fixing folder mapping:', error)
      toast({
        title: "❌ Error",
        description: "An unexpected error occurred while fixing folder mapping",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsFixingFolders(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings ⚙️</h1>
            <p className="mt-2 text-white/90">Customize your admin experience</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <Settings className="h-8 w-8 animate-spin-slow" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button onClick={saveSettings} className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
          <Button onClick={resetSettings} variant="outline" className="rounded-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <Badge variant="secondary" className="rounded-full px-4 py-2 text-sm font-medium">
          <Crown className="mr-1 h-3 w-3" />
          Super Admin Account
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg shadow-purple-100/50 dark:shadow-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className={`w-full justify-start rounded-xl ${activeTab === "profile" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : ""
                  }`}
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant={activeTab === "security" ? "default" : "ghost"}
                className={`w-full justify-start rounded-xl ${activeTab === "security" ? "bg-gradient-to-r from-red-500 to-pink-500 text-white" : ""
                  }`}
                onClick={() => setActiveTab("security")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
              <Button
                variant={activeTab === "appearance" ? "default" : "ghost"}
                className={`w-full justify-start rounded-xl ${activeTab === "appearance" ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white" : ""
                  }`}
                onClick={() => setActiveTab("appearance")}
              >
                <Palette className="mr-2 h-4 w-4" />
                Appearance
              </Button>
              <Button
                variant={activeTab === "notifications" ? "default" : "ghost"}
                className={`w-full justify-start rounded-xl ${activeTab === "notifications" ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white" : ""
                  }`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button
                variant={activeTab === "system" ? "default" : "ghost"}
                className={`w-full justify-start rounded-xl ${activeTab === "system" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" : ""
                  }`}
                onClick={() => setActiveTab("system")}
              >
                <Database className="mr-2 h-4 w-4" />
                System
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Settings Content */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20">
            <CardContent className="p-6">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold">Profile Settings</h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20 border-4 border-primary">
                      <AvatarImage src="/abstract-profile.png" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" className="rounded-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Change Avatar
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, PNG max 2MB</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={settings.profile.name}
                        onChange={(e) => updateSetting("profile", "name", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => updateSetting("profile", "email", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={settings.profile.bio}
                      onChange={(e) => updateSetting("profile", "bio", e.target.value)}
                      className="rounded-xl"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={settings.profile.timezone}
                        onValueChange={(value) => updateSetting("profile", "timezone", value)}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Jakarta">Asia/Jakarta (UTC+7)</SelectItem>
                          <SelectItem value="Asia/Singapore">Asia/Singapore (UTC+8)</SelectItem>
                          <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={settings.profile.language}
                        onValueChange={(value) => updateSetting("profile", "language", value)}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Bahasa Indonesia</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-500" />
                    <h3 className="text-lg font-semibold">Security Settings</h3>
                  </div>

                  <Alert className="rounded-xl border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/20">
                    <Lock className="h-4 w-4" />
                    <AlertTitle>Security Status</AlertTitle>
                    <AlertDescription>Your account security level is: <strong>High</strong></AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                        <p className="text-xs text-muted-foreground">Add extra security with 2FA</p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactorEnabled}
                        onCheckedChange={(checked) => updateSetting("security", "twoFactorEnabled", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">IP Whitelist</Label>
                        <p className="text-xs text-muted-foreground">Restrict access to specific IPs</p>
                      </div>
                      <Switch
                        checked={settings.security.ipWhitelist}
                        onCheckedChange={(checked) => updateSetting("security", "ipWhitelist", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                        <Select
                          value={settings.security.sessionTimeout}
                          onValueChange={(value) => updateSetting("security", "sessionTimeout", value)}
                        >
                          <SelectTrigger className="rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 hour</SelectItem>
                            <SelectItem value="8">8 hours</SelectItem>
                            <SelectItem value="24">24 hours</SelectItem>
                            <SelectItem value="168">1 week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                        <Select
                          value={settings.security.passwordExpiry}
                          onValueChange={(value) => updateSetting("security", "passwordExpiry", value)}
                        >
                          <SelectTrigger className="rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full rounded-xl">
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-purple-500" />
                    <h3 className="text-lg font-semibold">Appearance Settings</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={settings.appearance.theme === "light" ? "default" : "outline"}
                          className="rounded-xl"
                          onClick={() => updateSetting("appearance", "theme", "light")}
                        >
                          <Sun className="mr-2 h-4 w-4" />
                          Light
                        </Button>
                        <Button
                          variant={settings.appearance.theme === "dark" ? "default" : "outline"}
                          className="rounded-xl"
                          onClick={() => updateSetting("appearance", "theme", "dark")}
                        >
                          <Moon className="mr-2 h-4 w-4" />
                          Dark
                        </Button>
                        <Button
                          variant={settings.appearance.theme === "system" ? "default" : "outline"}
                          className="rounded-xl"
                          onClick={() => updateSetting("appearance", "theme", "system")}
                        >
                          <Monitor className="mr-2 h-4 w-4" />
                          System
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="flex gap-2">
                        {["purple", "blue", "green", "orange", "pink"].map((color) => (
                          <button
                            key={color}
                            title={`Select ${color} theme`}
                            aria-label={`Select ${color} theme`}
                            className={`h-8 w-8 rounded-full border-2 ${settings.appearance.accentColor === color ? "border-foreground" : "border-muted"
                              }`}
                            style={{
                              backgroundColor:
                                color === "purple"
                                  ? "#8b5cf6"
                                  : color === "blue"
                                    ? "#3b82f6"
                                    : color === "green"
                                      ? "#10b981"
                                      : color === "orange"
                                        ? "#f97316"
                                        : "#ec4899",
                            }}
                            onClick={() => updateSetting("appearance", "accentColor", color)}
                          />
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Compact Mode</Label>
                        <p className="text-xs text-muted-foreground">Reduce spacing for more content</p>
                      </div>
                      <Switch
                        checked={settings.appearance.compactMode}
                        onCheckedChange={(checked) => updateSetting("appearance", "compactMode", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Animations</Label>
                        <p className="text-xs text-muted-foreground">Enable smooth transitions</p>
                      </div>
                      <Switch
                        checked={settings.appearance.animations}
                        onCheckedChange={(checked) => updateSetting("appearance", "animations", checked)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-yellow-500" />
                    <h3 className="text-lg font-semibold">Notification Settings</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => updateSetting("notifications", "email", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">Browser push notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) => updateSetting("notifications", "push", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Desktop Alerts</Label>
                        <p className="text-xs text-muted-foreground">System notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.desktop}
                        onCheckedChange={(checked) => updateSetting("notifications", "desktop", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Sound Effects</Label>
                        <p className="text-xs text-muted-foreground">Play sounds for notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.sound}
                        onCheckedChange={(checked) => updateSetting("notifications", "sound", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="digest">Email Digest Frequency</Label>
                      <Select
                        value={settings.notifications.digest}
                        onValueChange={(value) => updateSetting("notifications", "digest", value)}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* System Settings */}
              {activeTab === "system" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-semibold">System Settings</h3>
                  </div>

                  <Alert className="rounded-xl border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20">
                    <Zap className="h-4 w-4" />
                    <AlertTitle>Caution</AlertTitle>
                    <AlertDescription>These settings affect the entire system. Use with care.</AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Auto Backup</Label>
                        <p className="text-xs text-muted-foreground">Automatically backup data daily</p>
                      </div>
                      <Switch
                        checked={settings.system.autoBackup}
                        onCheckedChange={(checked) => updateSetting("system", "autoBackup", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Analytics Tracking</Label>
                        <p className="text-xs text-muted-foreground">Collect usage analytics</p>
                      </div>
                      <Switch
                        checked={settings.system.analyticsTracking}
                        onCheckedChange={(checked) => updateSetting("system", "analyticsTracking", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Debug Mode</Label>
                        <p className="text-xs text-muted-foreground">Enable detailed logging</p>
                      </div>
                      <Switch
                        checked={settings.system.debugMode}
                        onCheckedChange={(checked) => updateSetting("system", "debugMode", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Maintenance Mode</Label>
                        <p className="text-xs text-muted-foreground">Put system in maintenance</p>
                      </div>
                      <Switch
                        checked={settings.system.maintenanceMode}
                        onCheckedChange={(checked) => updateSetting("system", "maintenanceMode", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Folder Mapping Fix</Label>
                        <p className="text-xs text-muted-foreground">
                          Fix folder mapping issues for completed reports. This ensures files are organized
                          based on upload form data (year & batch) instead of user profile data.
                        </p>
                        <Button
                          variant="outline"
                          className="w-full rounded-xl"
                          onClick={handleFixFolderMapping}
                          disabled={isFixingFolders}
                        >
                          {isFixingFolders ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Fixing Folder Mapping...
                            </>
                          ) : (
                            <>
                              <FolderOpen className="mr-2 h-4 w-4" />
                              Fix Folder Mapping
                            </>
                          )}
                        </Button>
                      </div>

                      <Separator />

                      <div className="grid gap-2 sm:grid-cols-2">
                        <Button variant="outline" className="rounded-xl">
                          <Download className="mr-2 h-4 w-4" />
                          Export Data
                        </Button>
                        <Button variant="outline" className="rounded-xl">
                          <Upload className="mr-2 h-4 w-4" />
                          Import Data
                        </Button>
                      </div>
                    </div>

                    <Button variant="destructive" className="w-full rounded-xl">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear All Data
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
