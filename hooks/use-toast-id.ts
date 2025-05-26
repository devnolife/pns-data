import type React from "react"
import { useToast as useToastOriginal } from "@/hooks/use-toast"
import { getToastMessage } from "@/lib/toast-messages-id"

type ToastCategory = "success" | "error" | "info" | "warning"

interface ToastOptions {
  description?: string
  duration?: number
  action?: React.ReactNode
}

export function useToastId() {
  const { toast } = useToastOriginal()

  const showToast = (
    category: ToastCategory,
    messageKey: string,
    options?: ToastOptions,
    values?: Record<string, string>,
  ) => {
    const title = getToastMessage(category, messageKey, values)

    return toast({
      title,
      description: options?.description,
      variant:
        category === "success"
          ? "default"
          : category === "error"
            ? "destructive"
            : category === "warning"
              ? "warning"
              : "default",
      duration: options?.duration || 5000,
      action: options?.action,
    })
  }

  return {
    success: (messageKey: string, options?: ToastOptions, values?: Record<string, string>) =>
      showToast("success", messageKey, options, values),

    error: (messageKey: string, options?: ToastOptions, values?: Record<string, string>) =>
      showToast("error", messageKey, options, values),

    info: (messageKey: string, options?: ToastOptions, values?: Record<string, string>) =>
      showToast("info", messageKey, options, values),

    warning: (messageKey: string, options?: ToastOptions, values?: Record<string, string>) =>
      showToast("warning", messageKey, options, values),

    // Keep access to the original toast function for custom cases
    toast,
  }
}
