import { useState, useEffect } from 'react'
import { X, Plus, Minus, ShoppingBag, Flame, MessageSquare } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct, items, addItem, setQty } = useCart()

  const cartItem = selectedProduct ? items.find(i => i.id === selectedProduct.id) : null
  const [qty, setLocalQty] = useState(1)
  const [obs, setObs]       = useState('')
  const [added, setAdded]   = useState(false)

  // Sincroniza estado ao abrir
  useEffect(() => {
    if (!selectedProduct) return
    setLocalQty(cartItem?.qty ?? 1)
    setObs(cartItem?.obs ?? '')
    setAdded(false)
  }, [selectedProduct])

  if (!selectedProduct) return null

  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const handleAdd = () => {
    if (cartItem) {
      setQty(selectedProduct.id, qty)
      // atualiza obs sem remover do carrinho
      addItem({ ...selectedProduct }, obs)
    } else {
      for (let i = 0; i < qty; i++) addItem(selectedProduct, obs)
    }
    setAdded(true)
    setTimeout(() => setSelectedProduct(null), 700)
  }

  const close = () => setSelectedProduct(null)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
        onClick={close}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-ox-surface border border-ox-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-modal flex flex-col max-h-[88vh]">

          {/* Botão fechar */}
          <button
            onClick={close}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-ox-black/70 backdrop-blur-sm rounded-full text-ox-muted hover:text-white transition-colors"
          >
            <X size={16} />
          </button>

          {/* Imagem — altura fixa para não dominar a tela */}
          <div className="relative h-52 shrink-0 overflow-hidden">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ox-surface via-transparent to-transparent" />

            {selectedProduct.popular && (
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-ox-yellow text-ox-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
                <Flame size={10} />
                Popular
              </div>
            )}
          </div>

          {/* Conteúdo rolável */}
          <div className="overflow-y-auto flex-1 p-5 space-y-4">

            {/* Nome e preço */}
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-white font-black text-xl leading-tight">{selectedProduct.name}</h2>
              <span className="shrink-0 text-ox-green font-black text-lg">{fmt(selectedProduct.price)}</span>
            </div>

            {/* Descrição */}
            <p className="text-ox-muted text-sm leading-relaxed">{selectedProduct.description}</p>

            {/* Observações */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-white text-xs font-semibold uppercase tracking-wider">
                <MessageSquare size={12} className="text-ox-green" />
                Observações
              </label>
              <textarea
                value={obs}
                onChange={e => setObs(e.target.value)}
                placeholder="Ex: sem cebola, maionese à parte, ponto da carne..."
                rows={3}
                className="w-full bg-ox-black border border-ox-border focus:border-ox-green/60 text-white placeholder-ox-muted text-sm px-3 py-2.5 rounded-xl outline-none resize-none transition-colors"
              />
            </div>

            {/* Qty + Adicionar — fixo na base */}
            <div className="flex items-center gap-3 pt-1 sticky bottom-0 bg-ox-surface pb-1">
              <div className="flex items-center gap-3 bg-ox-black border border-ox-border rounded-xl px-2">
                <button
                  onClick={() => setLocalQty(q => Math.max(1, q - 1))}
                  className="w-9 h-10 flex items-center justify-center text-ox-muted hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white font-bold text-base w-5 text-center">{qty}</span>
                <button
                  onClick={() => setLocalQty(q => q + 1)}
                  className="w-9 h-10 flex items-center justify-center text-ox-muted hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all ${
                  added
                    ? 'bg-ox-green/20 border border-ox-green text-ox-green'
                    : 'bg-ox-green hover:bg-ox-green-hover text-white hover:shadow-lg hover:shadow-ox-green/30'
                }`}
              >
                <ShoppingBag size={16} />
                {added ? 'Adicionado!' : `Adicionar · ${fmt(selectedProduct.price * qty)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
