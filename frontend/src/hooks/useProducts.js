import { useEffect, useState } from 'react'
import { menuItems } from '../data/menu'

export function useProducts() {
  const [products, setProducts] = useState(menuItems)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setProducts(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { products, loading }
}
