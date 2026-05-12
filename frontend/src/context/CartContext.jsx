import { createContext, useCallback, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems]                   = useState([])
  const [isCartOpen, setIsCartOpen]         = useState(false)
  const [isCheckout, setIsCheckout]         = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const addItem = useCallback((item, obs = '') => {
    setItems(prev => {
      const found = prev.find(i => i.id === item.id)
      if (found) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1, obs } : i)
      return [...prev, { ...item, qty: 1, obs }]
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const setQty = useCallback((id, qty) => {
    if (qty <= 0) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const total     = items.reduce((s, i) => s + i.price * i.qty, 0)
  const itemCount = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, setQty, clearCart,
      total, itemCount,
      isCartOpen, setIsCartOpen,
      isCheckout, setIsCheckout,
      selectedProduct, setSelectedProduct,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
