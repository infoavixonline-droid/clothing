import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size: string
}

interface CartContextValue {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity">, qty?: number) => void
  removeFromCart: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, qty: number) => void
  getCartTotal: () => number
  getTotalItems: () => number
  clearCart: () => void
}

const CART_KEY = "clothing_cart"

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      return stored ? (JSON.parse(stored) as CartItem[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = useCallback(
    (product: Omit<CartItem, "quantity">, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.id === product.id && i.size === product.size,
        )
        if (existing) {
          return prev.map((i) =>
            i.id === product.id && i.size === product.size
              ? { ...i, quantity: i.quantity + qty }
              : i,
          )
        }
        return [...prev, { ...product, quantity: qty }]
      })
    },
    [],
  )

  const removeFromCart = useCallback((id: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)))
  }, [])

  const updateQuantity = useCallback(
    (id: string, size: string, qty: number) => {
      if (qty <= 0) {
        removeFromCart(id, size)
        return
      }
      setItems((prev) =>
        prev.map((i) =>
          i.id === id && i.size === size ? { ...i, quantity: qty } : i,
        ),
      )
    },
    [removeFromCart],
  )

  const getCartTotal = useCallback(() => {
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  }, [items])

  const getTotalItems = useCallback(() => {
    return items.reduce((sum, i) => sum + i.quantity, 0)
  }, [items])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getTotalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
