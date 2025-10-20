export class LocaleFormatter {
  constructor(private locale: string) {}

  // Date formatting
  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Intl.DateTimeFormat(this.locale, options || defaultOptions).format(date)
  }

  formatRelativeTime(date: Date): string {
    const rtf = new Intl.RelativeTimeFormat(this.locale, { numeric: "auto" })
    const now = new Date()
    const diffInMs = date.getTime() - now.getTime()
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24))

    if (Math.abs(diffInDays) < 1) {
      const diffInHours = Math.round(diffInMs / (1000 * 60 * 60))
      return rtf.format(diffInHours, "hour")
    } else if (Math.abs(diffInDays) < 7) {
      return rtf.format(diffInDays, "day")
    } else if (Math.abs(diffInDays) < 30) {
      return rtf.format(Math.round(diffInDays / 7), "week")
    } else {
      return rtf.format(Math.round(diffInDays / 30), "month")
    }
  }

  // Number formatting
  formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.locale, options).format(value)
  }

  formatCurrency(amount: number, currency = "USD"): string {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency,
    }).format(amount)
  }

  formatPercent(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value)
  }

  // List formatting
  formatList(items: string[], type: "conjunction" | "disjunction" = "conjunction"): string {
    return new Intl.ListFormat(this.locale, { type }).format(items)
  }
}
