import { useState } from 'react'
import { X, MapPin, Store, CreditCard, Banknote, QrCode, ChevronRight, Check, Copy, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

const PAYMENT_METHODS = [
  { id: 'pix',    label: 'Pix',              icon: QrCode,     desc: 'Aprovação imediata' },
  { id: 'card',   label: 'Cartão',           icon: CreditCard, desc: 'Crédito ou Débito' },
  { id: 'cash',   label: 'Dinheiro',         icon: Banknote,   desc: 'Pagar na entrega' },
]

function PixPanel() {
  const [copied, setCopied] = useState(false)
  const pixKey = 'oxbread@pagamento.com.br'

  const copy = () => {
    navigator.clipboard.writeText(pixKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-4 p-4 bg-ox-black rounded-xl border border-ox-green/30 space-y-4">
      {/* QR code mockup */}
      <div className="flex justify-center">
        <div className="w-40 h-40 bg-white rounded-xl p-3 flex items-center justify-center">
          <div className="grid grid-cols-5 gap-0.5 w-full h-full">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-sm ${
                  [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24,6,12,18,7,11,17].includes(i)
                    ? 'bg-black' : 'bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-ox-muted text-xs">
        Escaneie o QR Code com o app do seu banco
      </p>
      <div className="flex items-center gap-2 bg-ox-surface rounded-lg px-3 py-2.5 border border-ox-border">
        <p className="flex-1 text-white text-xs font-mono truncate">{pixKey}</p>
        <button onClick={copy} className="text-ox-muted hover:text-ox-green transition-colors shrink-0">
          {copied ? <Check size={14} className="text-ox-green" /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  )
}

function CardPanel() {
  return (
    <div className="mt-4 p-4 bg-ox-black rounded-xl border border-ox-border space-y-3">
      <p className="text-ox-muted text-xs">Você será redirecionado ao MercadoPago para concluir o pagamento com segurança.</p>
      <div className="flex flex-wrap gap-2">
        {['Visa', 'Mastercard', 'Elo', 'Amex', 'Hipercard'].map(b => (
          <span key={b} className="text-[10px] font-semibold border border-ox-border text-ox-muted px-2 py-1 rounded-md">
            {b}
          </span>
        ))}
      </div>
    </div>
  )
}

function CashPanel({ value, onChange }) {
  return (
    <div className="mt-4 p-4 bg-ox-black rounded-xl border border-ox-border space-y-2">
      <label className="text-ox-muted text-xs">Troco para quanto? (opcional)</label>
      <input
        type="text"
        placeholder="Ex: R$ 50,00"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-ox-surface border border-ox-border text-white placeholder-ox-muted text-sm px-3 py-2.5 rounded-lg outline-none focus:border-ox-green/60 transition-colors"
      />
    </div>
  )
}

export default function CheckoutModal() {
  const { items, total, isCheckout, setIsCheckout, clearCart } = useCart()

  const [deliveryType, setDeliveryType] = useState('delivery')
  const [payment, setPayment]           = useState('pix')
  const [change, setChange]             = useState('')
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const fee  = deliveryType === 'delivery' ? 5 : 0

  const paymentLabel = { pix: 'Pix', card: 'Cartão (MercadoPago)', cash: 'Dinheiro' }

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Informe seu nome'
    if (!form.phone.trim()) e.phone = 'Informe seu telefone'
    if (deliveryType === 'delivery' && !form.address.trim()) e.address = 'Informe o endereço de entrega'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)
    setApiError('')

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          deliveryType,
          address: form.address || undefined,
          payment,
          change: change || undefined,
          items: items.map(i => ({
            id: String(i.id),
            name: i.name,
            price: i.price,
            qty: i.qty,
            obs: i.obs || undefined,
          })),
        }),
      })

      if (!res.ok) throw new Error('Erro ao enviar pedido')

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setIsCheckout(false)
        clearCart()
      }, 3000)
    } catch {
      setApiError('Não foi possível enviar o pedido. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!isCheckout) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setIsCheckout(false)} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
        <div className="relative bg-ox-surface border border-ox-border rounded-2xl w-full max-w-2xl shadow-2xl my-auto">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-ox-border">
            <h2 className="text-white font-bold text-xl">Finalizar Pedido</h2>
            <button onClick={() => setIsCheckout(false)} className="text-ox-muted hover:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {success ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-8">
              <div className="w-16 h-16 rounded-full bg-ox-green flex items-center justify-center shadow-lg shadow-ox-green/30">
                <Check size={28} className="text-white" />
              </div>
              <h3 className="text-white font-black text-2xl">Pedido Confirmado!</h3>
              <p className="text-ox-muted text-sm max-w-xs">
                Seu pedido foi recebido. O gerente já foi notificado e em breve você receberá a confirmação.
              </p>
            </div>
          ) : (
            <div className="p-6 space-y-6">

              {/* Order summary */}
              <section>
                <h3 className="text-white font-semibold text-sm mb-3">Resumo do Pedido</h3>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-ox-muted">
                        <span className="text-ox-green font-bold mr-1">{item.qty}×</span>
                        {item.name}
                      </span>
                      <span className="text-white font-semibold">{fmt(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Divider */}
              <div className="border-t border-ox-border" />

              {/* Customer info */}
              <section className="space-y-3">
                <h3 className="text-white font-semibold text-sm">Seus Dados</h3>
                <div>
                  <input
                    placeholder="Nome completo"
                    value={form.name}
                    onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })) }}
                    className={`w-full bg-ox-black border text-white placeholder-ox-muted text-sm px-4 py-3 rounded-xl outline-none focus:border-ox-green/60 transition-colors ${errors.name ? 'border-red-500' : 'border-ox-border'}`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 pl-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    placeholder="Telefone / WhatsApp"
                    value={form.phone}
                    onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: '' })) }}
                    className={`w-full bg-ox-black border text-white placeholder-ox-muted text-sm px-4 py-3 rounded-xl outline-none focus:border-ox-green/60 transition-colors ${errors.phone ? 'border-red-500' : 'border-ox-border'}`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1 pl-1">{errors.phone}</p>}
                </div>
              </section>

              {/* Delivery type */}
              <section className="space-y-3">
                <h3 className="text-white font-semibold text-sm">Tipo de Entrega</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'delivery', label: 'Entrega em casa', icon: MapPin, sub: '+ R$ 5,00' },
                    { id: 'pickup',   label: 'Retirar no local',  icon: Store,  sub: 'Grátis' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setDeliveryType(opt.id)}
                      className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                        deliveryType === opt.id
                          ? 'border-ox-green bg-ox-green/10 text-white'
                          : 'border-ox-border text-ox-muted hover:border-white/20'
                      }`}
                    >
                      <opt.icon size={18} className={deliveryType === opt.id ? 'text-ox-green' : ''} />
                      <p className="font-semibold text-sm mt-2">{opt.label}</p>
                      <p className={`text-xs mt-0.5 ${deliveryType === opt.id ? 'text-ox-green' : 'text-ox-muted'}`}>
                        {opt.sub}
                      </p>
                    </button>
                  ))}
                </div>

                {deliveryType === 'delivery' && (
                  <div>
                    <input
                      placeholder="Endereço de entrega"
                      value={form.address}
                      onChange={e => { setForm(p => ({ ...p, address: e.target.value })); setErrors(p => ({ ...p, address: '' })) }}
                      className={`w-full bg-ox-black border text-white placeholder-ox-muted text-sm px-4 py-3 rounded-xl outline-none focus:border-ox-green/60 transition-colors ${errors.address ? 'border-red-500' : 'border-ox-border'}`}
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1 pl-1">{errors.address}</p>}
                  </div>
                )}
              </section>

              {/* Payment */}
              <section className="space-y-3">
                <h3 className="text-white font-semibold text-sm">Método de Pagamento</h3>
                <div className="grid grid-cols-3 gap-2">
                  {PAYMENT_METHODS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPayment(m.id)}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all ${
                        payment === m.id
                          ? 'border-ox-green bg-ox-green/10'
                          : 'border-ox-border hover:border-white/20'
                      }`}
                    >
                      <m.icon
                        size={20}
                        className={payment === m.id ? 'text-ox-green' : 'text-ox-muted'}
                      />
                      <p className={`font-semibold text-xs ${payment === m.id ? 'text-white' : 'text-ox-muted'}`}>
                        {m.label}
                      </p>
                      <p className="text-[10px] text-ox-muted">{m.desc}</p>
                    </button>
                  ))}
                </div>

                {payment === 'pix'  && <PixPanel />}
                {payment === 'card' && <CardPanel />}
                {payment === 'cash' && <CashPanel value={change} onChange={setChange} />}
              </section>

              {/* Total */}
              <div className="bg-ox-black rounded-xl p-4 border border-ox-border space-y-2">
                <div className="flex justify-between text-sm text-ox-muted">
                  <span>Subtotal</span>
                  <span>{fmt(total)}</span>
                </div>
                {fee > 0 && (
                  <div className="flex justify-between text-sm text-ox-muted">
                    <span>Taxa de entrega</span>
                    <span>{fmt(fee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-black text-lg pt-2 border-t border-ox-border mt-2">
                  <span>Total</span>
                  <span className="text-ox-green">{fmt(total + fee)}</span>
                </div>
              </div>

              {/* Submit */}
              {apiError && (
                <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/30 rounded-xl py-3 px-4">
                  {apiError}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-ox-green hover:bg-ox-green-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-ox-green/30"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando pedido...
                  </>
                ) : (
                  <>
                    Confirmar Pedido
                    <ChevronRight size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-ox-muted text-xs">
                Ao confirmar, o gerente receberá seu pedido via WhatsApp.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
