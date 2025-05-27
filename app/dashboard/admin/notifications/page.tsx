"use client"

import { useState } from "react"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Settings,
  Filter,
  MoreVertical,
  Trash2,
  MarkAsUnread,
  Clock,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  timestamp: string
  isRead: boolean
  category: "system" | "user" | "security" | "reports"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "🔥 Sistem Overload Detected!",
    message: "High traffic detected. Server performance monitoring aktif 🚀",
    type: "warning",
    timestamp: "2 menit yang lalu",
    isRead: false,
    category: "system",
  },
  {
    id: "2",
    title: "✨ New User Registration",
    message: "Sarah Chen just joined! Welcome them to the platform 🎉",
    type: "success",
    timestamp: "5 menit yang lalu",
    isRead: false,
    category: "user",
  },
  {
    id: "3",
    title: "🛡️ Security Alert",
    message: "Multiple failed login attempts detected from IP 192.168.1.100",
    type: "error",
    timestamp: "10 menit yang lalu",
    isRead: true,
    category: "security",
  },
  {
    id: "4",
    title: "📊 Report Submitted",
    message: "Quarterly report 'Q1 2025' needs your verification ASAP ⚡",
    type: "info",
    timestamp: "1 jam yang lalu",
    isRead: false,
    category: "reports",
  },
  {
    id: "5",
    title: "💾 Backup Completed",
    message: "System backup completed successfully. All data is safe! ✅",
    type: "success",
    timestamp: "3 jam yang lalu",
    isRead: true,
    category: "system",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    desktop: false,
    sms: false,
  })

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBadgeVariant = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const toggleRead = (id: string) => {
    setNotifications(
      notifications.map((notif) => (notif.id === id ? { ...notif, isRead: !notif.isRead } : notif)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
  }

  const getFilteredNotifications = () => {
    if (activeTab === "all") return notifications
    if (activeTab === "unread") return notifications.filter((n) => !n.isRead)
    return notifications.filter((n) => n.category === activeTab)
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="space-y-6">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications 🔔</h1>
            <p className="mt-2 text-white/90">Stay updated with real-time alerts!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <Bell className="h-8 w-8 animate-pulse" />
              {unreadCount > 0 && (
                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                  {unreadCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button onClick={markAllAsRead} className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600">
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline" className="rounded-full">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <Badge variant="secondary" className="rounded-full px-4 py-2 text-sm font-medium">
          {unreadCount} unread notifications
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Notifications */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-lg shadow-purple-100/50 dark:shadow-purple-900/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Live Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 grid w-full grid-cols-6 rounded-xl bg-muted/50 p-1">
                  <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                    Unread
                  </TabsTrigger>
                  <TabsTrigger value="system" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                    System
                  </TabsTrigger>
                  <TabsTrigger value="user" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                    Reports
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4">
                  {getFilteredNotifications().length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-6">
                        <Bell className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">No notifications here!</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        You're all caught up. Check back later for updates!
                      </p>
                    </div>
                  ) : (
                    getFilteredNotifications().map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "group relative rounded-2xl border p-4 transition-all hover:shadow-md",
                          !notification.isRead
                            ? "border-l-4 border-l-primary bg-primary/5 shadow-sm"
                            : "border-border bg-background hover:bg-muted/50",
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">{getIcon(notification.type)}</div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-semibold leading-tight">{notification.title}</h4>
                              <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem onClick={() => toggleRead(notification.id)}>
                                      <MarkAsUnread className="mr-2 h-4 w-4" />
                                      {notification.isRead ? "Mark Unread" : "Mark Read"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => deleteNotification(notification.id)}
                                      className="text-destructive focus:text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant={getBadgeVariant(notification.type)} className="rounded-full text-xs">
                                  {notification.category}
                                </Badge>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {notification.timestamp}
                                </span>
                              </div>
                              {!notification.isRead && (
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
              <CardDescription>Customize your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-sm font-medium">
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, email: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="text-sm font-medium">
                    Push Notifications
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, push: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="desktop-notifications" className="text-sm font-medium">
                    Desktop Alerts
                  </Label>
                  <Switch
                    id="desktop-notifications"
                    checked={notificationSettings.desktop}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, desktop: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications" className="text-sm font-medium">
                    SMS Alerts
                  </Label>
                  <Switch
                    id="sms-notifications"
                    checked={notificationSettings.sms}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, sms: checked })
                    }
                  />
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 dark:from-purple-950/20 dark:to-pink-950/20">
                <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100">Pro Tip 💡</h4>
                <p className="mt-1 text-xs text-purple-700 dark:text-purple-200">
                  Enable push notifications for real-time updates and never miss important alerts!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
