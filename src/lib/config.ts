export const WHATSAPP_NUMBER = "94771234567"
export const STORE_NAME = "MODA"
export const STORE_TAGLINE = "Minimal clothing for modern living."

export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-US")}`
}
