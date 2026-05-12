import { Plus, Minus, Flame } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ item }) {
  const { items, setQty, setSelectedProduct } = useCart()
  const cartItem = items.find(i => i.id === item.id)
  const qty = cartItem?.qty ?? 0

  const fmt = (v) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div
      onClick={() => setSelectedProduct(item)}
      className="group relative bg-ox-card border border-ox-border hover:border-ox-green/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-ox-green/10 hover:-translate-y-1 cursor-pointer isolate will-change-transform"
    >
      {/* Imagem */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ox-card/80 via-transparent to-transparent" />

        {item.popular && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-ox-yellow text-ox-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
            <Flame size={10} />
            Popular
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-ox-black/80 backdrop-blur-sm text-white font-black text-base px-3 py-1 rounded-xl border border-ox-border">
          {fmt(item.price)}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <h3 className="text-white font-bold text-base leading-snug">{item.name}</h3>
          <p className="text-ox-muted text-sm mt-1 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Controles de qty — param propagação para não abrir o modal */}
        {qty === 0 ? (
          <div className="w-full flex items-center justify-center gap-2 bg-ox-green hover:bg-ox-green-hover text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
            <Plus size={16} />
            Adicionar
          </div>
        ) : (
          <div
            onClick={e => e.stopPropagation()}
            className="flex items-center justify-between bg-ox-surface rounded-xl px-1"
          >
            <button
              onClick={() => setQty(item.id, qty - 1)}
              className="w-9 h-9 flex items-center justify-center text-white hover:text-ox-yellow transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="text-white font-bold text-sm">{qty}</span>
            <button
              onClick={() => setSelectedProduct(item)}
              className="w-9 h-9 flex items-center justify-center text-white hover:text-ox-green transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
