import { WHATSAPP_NUMBER } from "./config"
import { formatCurrency } from "./config"
import type { CartItem } from "../context/CartContext"

export function buildBuyNowMessage(
  name: string,
  qty: number,
  price: number,
  size: string,
): string {
  const total = qty * price
  return (
    `Hi! I'd like to order:\n\n` +
    `- ${name} (Size: ${size}) x${qty} - ${formatCurrency(price)}\n\n` +
    `Total: ${formatCurrency(total)}`
  )
}

export function buildBuyAllMessage(items: CartItem[]): string {
  const lines = items
    .map(
      (item) =>
        `- ${item.name} (Size: ${item.size}) x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`,
    )
    .join("\n")
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    `Hi! I'd like to order the following:\n\n${lines}\n\nTotal: ${formatCurrency(total)}`
  )
}

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
