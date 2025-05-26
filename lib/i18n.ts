import translations from '@/translations/id.json'

type Path = string[]

function getNestedValue(obj: any, path: Path): string {
  return path.reduce((current, key) => current?.[key], obj)
}

export function t(key: string, params?: Record<string, string | number>): string {
  const path = key.split('.')
  let text = getNestedValue(translations, path)

  if (!text) {
    console.warn(`Translation missing for key: ${key}`)
    return key
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, String(value))
    })
  }

  return text
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat('id-ID').format(number)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
} 
