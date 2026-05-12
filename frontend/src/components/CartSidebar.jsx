import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartSidebar() {
  const { items, setQty, removeItem, total, itemCount, isCartOpen, setIsCartOpen, setIsCheckout } = useCart()

  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-ox-surface border-l border-ox-border flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ox-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-ox-green" />
            <h2 className="text-white font-bold text-lg">Meu Pedido</h2>
            {itemCount > 0 && (
              <span className="bg-ox-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? 'item' : 'itens'}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-ox-muted hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
              <div className="w-16 h-16 rounded-full bg-ox-card border border-ox-border flex items-center justify-center">
                <ShoppingBag size={24} className="text-ox-muted" />
              </div>
              <div>
                <p className="text-white font-semibold">Seu pedido está vazio</p>
                <p className="text-ox-muted text-sm mt-1">Adicione itens do cardápio</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-ox-green hover:text-ox-green-hover text-sm font-semibold transition-colors"
              >
                Ver Cardápio →
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-ox-card border border-ox-border rounded-xl p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-ox-green font-bold text-sm mt-0.5">
                    {fmt(item.price * item.qty)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2 bg-ox-surface rounded-lg px-1">
                      <button
                        onClick={() => setQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-ox-muted hover:text-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white text-sm font-bold w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-ox-muted hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-ox-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-ox-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-ox-muted text-sm">Subtotal</span>
              <span className="text-white font-black text-xl">{fmt(total)}</span>
            </div>
            <button
              onClick={() => { setIsCartOpen(false); setIsCheckout(true) }}
              className="w-full bg-ox-green hover:bg-ox-green-hover text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-ox-green/30 text-base"
            >
              Finalizar Pedido
            </button>
            <p className="text-center text-ox-muted text-xs">
              Pagamento seguro via MercadoPago · Pix · Cartão
            </p>
          </div>
        )}
      </div>
    </>
  )
}
