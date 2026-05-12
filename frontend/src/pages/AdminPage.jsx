import { useEffect, useRef, useState } from 'react'
import {
  Check, Flame, ImageUp, Link, Loader2, LogOut, Pencil, Plus, Trash2, X, ShieldCheck,
} from 'lucide-react'

const CATEGORIES = [
  { id: 'burgers', label: 'Burgers' },
  { id: 'drinks',  label: 'Bebidas' },
  { id: 'sides',   label: 'Acompanhamentos' },
]

const CATEGORY_LABEL = { burgers: 'Burger', drinks: 'Bebida', sides: 'Acompanhamento' }

const EMPTY_FORM = {
  name: '', description: '', category: 'burgers',
  price: '', image: '', popular: false,
}

function authHeader(token) {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
}

// ── Login ──────────────────────────────────────────────────────────────────

function LoginPanel({ onLogin }) {
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) throw new Error()
      const { token } = await res.json()
      localStorage.setItem('admin_token', token)
      onLogin(token)
    } catch {
      setError('Senha incorreta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ox-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-ox-green flex items-center justify-center shadow-lg shadow-ox-green/30">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-white font-black text-2xl">OxBread Admin</h1>
            <p className="text-ox-muted text-sm mt-1">Acesso restrito ao gerente</p>
          </div>
        </div>

        <form onSubmit={submit} className="bg-ox-surface border border-ox-border rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-ox-muted text-xs font-semibold uppercase tracking-wider block mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              className={`w-full bg-ox-black border text-white placeholder-ox-muted text-sm px-4 py-3 rounded-xl outline-none focus:border-ox-green/60 transition-colors ${error ? 'border-red-500' : 'border-ox-border'}`}
            />
            {error && <p className="text-red-400 text-xs mt-1.5 pl-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full flex items-center justify-center gap-2 bg-ox-green hover:bg-ox-green-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Modal de produto ───────────────────────────────────────────────────────

function ProductModal({ product, onClose, onSave, token }) {
  const [form, setForm]         = useState(product
    ? { ...product, price: String(product.price) }
    : EMPTY_FORM
  )
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})
  const [imageMode, setImageMode] = useState('url')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef(null)

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => ({ ...p, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name        = 'Obrigatório'
    if (!form.description.trim()) e.description = 'Obrigatório'
    if (!form.image.trim())       e.image       = 'Obrigatório'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
      e.price = 'Preço inválido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError('')
    try {
      const data = new FormData()
      data.append('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      })
      if (!res.ok) throw new Error()
      const { url } = await res.json()
      set('image', url)
    } catch {
      setUploadError('Falha no upload. Tente novamente.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true)
    await onSave({ ...form, price: Number(form.price) })
    setLoading(false)
  }

  const field = (label, key, type = 'text', placeholder = '') => (
    <div>
      <label className="text-ox-muted text-xs font-semibold uppercase tracking-wider block mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={e => set(key, e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-ox-black border text-white placeholder-ox-muted text-sm px-3 py-2.5 rounded-xl outline-none focus:border-ox-green/60 transition-colors ${errors[key] ? 'border-red-500' : 'border-ox-border'}`}
      />
      {errors[key] && <p className="text-red-400 text-xs mt-1 pl-1">{errors[key]}</p>}
    </div>
  )

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative bg-ox-surface border border-ox-border rounded-2xl w-full max-w-lg shadow-2xl my-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-ox-border">
            <h2 className="text-white font-bold text-lg">
              {product ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            <button onClick={onClose} className="text-ox-muted hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {field('Nome', 'name', 'text', 'Ex: OxBread Classic')}

            <div>
              <label className="text-ox-muted text-xs font-semibold uppercase tracking-wider block mb-1.5">
                Descrição
              </label>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                rows={3}
                placeholder="Ingredientes e detalhes..."
                className={`w-full bg-ox-black border text-white placeholder-ox-muted text-sm px-3 py-2.5 rounded-xl outline-none focus:border-ox-green/60 transition-colors resize-none ${errors.description ? 'border-red-500' : 'border-ox-border'}`}
              />
              {errors.description && <p className="text-red-400 text-xs mt-1 pl-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-ox-muted text-xs font-semibold uppercase tracking-wider block mb-1.5">
                  Categoria
                </label>
                <select
                  value={form.category}
                  onChange={e => set('category', e.target.value)}
                  className="w-full bg-ox-black border border-ox-border text-white text-sm px-3 py-2.5 rounded-xl outline-none focus:border-ox-green/60 transition-colors"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              {field('Preço (R$)', 'price', 'number', '0.00')}
            </div>

            {/* Imagem */}
            <div>
              <label className="text-ox-muted text-xs font-semibold uppercase tracking-wider block mb-1.5">
                Imagem
              </label>

              {/* Tabs URL / Upload */}
              <div className="flex gap-1 mb-2 p-1 bg-ox-black rounded-xl border border-ox-border">
                {[
                  { id: 'url',    label: 'Link URL',  Icon: Link     },
                  { id: 'upload', label: 'Upload',     Icon: ImageUp  },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setImageMode(id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      imageMode === id
                        ? 'bg-ox-surface text-white shadow'
                        : 'text-ox-muted hover:text-white'
                    }`}
                  >
                    <Icon size={12} />
                    {label}
                  </button>
                ))}
              </div>

              {imageMode === 'url' ? (
                <input
                  type="text"
                  value={form.image}
                  onChange={e => set('image', e.target.value)}
                  placeholder="https://..."
                  className={`w-full bg-ox-black border text-white placeholder-ox-muted text-sm px-3 py-2.5 rounded-xl outline-none focus:border-ox-green/60 transition-colors ${errors.image ? 'border-red-500' : 'border-ox-border'}`}
                />
              ) : (
                <div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="w-full flex items-center justify-center gap-2 border border-dashed border-ox-border hover:border-ox-green/50 text-ox-muted hover:text-white bg-ox-black rounded-xl py-6 text-sm transition-all disabled:opacity-50"
                  >
                    {uploading
                      ? <><Loader2 size={15} className="animate-spin" /> Enviando...</>
                      : <><ImageUp size={15} /> Clique para selecionar a imagem</>
                    }
                  </button>
                  {uploadError && (
                    <p className="text-red-400 text-xs mt-1 pl-1">{uploadError}</p>
                  )}
                </div>
              )}

              {errors.image && <p className="text-red-400 text-xs mt-1 pl-1">{errors.image}</p>}
            </div>

            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="w-full h-36 object-cover rounded-xl border border-ox-border"
                onError={e => { e.target.style.display = 'none' }}
              />
            )}

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div
                onClick={() => set('popular', !form.popular)}
                className={`w-11 h-6 rounded-full transition-colors relative ${form.popular ? 'bg-ox-yellow' : 'bg-ox-border'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${form.popular ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="flex items-center gap-1.5 text-white text-sm font-medium">
                <Flame size={14} className={form.popular ? 'text-ox-yellow' : 'text-ox-muted'} />
                Popular
              </span>
            </label>
          </div>

          <div className="flex gap-3 px-6 pb-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-ox-border text-ox-muted hover:text-white hover:border-white/30 text-sm font-semibold transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-ox-green hover:bg-ox-green-hover disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-all"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Painel principal ───────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken]         = useState(() => localStorage.getItem('admin_token') ?? '')
  const [products, setProducts]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [modal, setModal]         = useState(null)   // null | 'new' | product object
  const [filterCat, setFilterCat] = useState('all')
  const [feedback, setFeedback]   = useState('')

  const isLogged = Boolean(token)

  const flash = (msg) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(''), 3000)
  }

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products')
      setProducts(await res.json())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLogged) loadProducts()
  }, [isLogged])

  const handleLogin = (t) => setToken(t)

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setToken('')
  }

  const handleSave = async (form) => {
    const isEdit = modal && modal !== 'new'
    const url    = isEdit ? `/api/products/${modal.id}` : '/api/products'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: authHeader(token),
      body: JSON.stringify(form),
    })

    if (res.status === 401) { handleLogout(); return }
    if (!res.ok) { flash('Erro ao salvar produto'); return }

    await loadProducts()
    setModal(null)
    flash(isEdit ? 'Produto atualizado!' : 'Produto criado!')
  }

  const handleDelete = async (product) => {
    if (!confirm(`Remover "${product.name}"?`)) return
    const res = await fetch(`/api/products/${product.id}`, {
      method: 'DELETE',
      headers: authHeader(token),
    })
    if (res.status === 401) { handleLogout(); return }
    await loadProducts()
    flash('Produto removido')
  }

  if (!isLogged) return <LoginPanel onLogin={handleLogin} />

  const filtered = filterCat === 'all'
    ? products
    : products.filter(p => p.category === filterCat)

  return (
    <div className="min-h-screen bg-ox-black text-white">

      {/* Top bar */}
      <header className="bg-ox-surface border-b border-ox-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ox-green flex items-center justify-center">
              <ShieldCheck size={16} className="text-white" />
            </div>
            <span className="font-black text-white text-lg">OxBread <span className="text-ox-green">Admin</span></span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-ox-muted hover:text-white text-sm transition-colors">Ver cardápio</a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-ox-muted hover:text-white text-sm transition-colors"
            >
              <LogOut size={15} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Page title + add button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-white font-black text-2xl">Cardápio</h2>
            <p className="text-ox-muted text-sm mt-0.5">{products.length} produtos cadastrados</p>
          </div>
          <button
            onClick={() => setModal('new')}
            className="flex items-center gap-2 bg-ox-green hover:bg-ox-green-hover text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-ox-green/20"
          >
            <Plus size={16} />
            Novo Produto
          </button>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[{ id: 'all', label: 'Todos' }, ...CATEGORIES].map(c => (
            <button
              key={c.id}
              onClick={() => setFilterCat(c.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filterCat === c.id
                  ? 'bg-ox-green border-ox-green text-white'
                  : 'border-ox-border text-ox-muted hover:border-white/30 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Feedback toast */}
        {feedback && (
          <div className="mb-6 flex items-center gap-2 bg-ox-green/10 border border-ox-green/40 text-ox-green text-sm px-4 py-3 rounded-xl">
            <Check size={15} />
            {feedback}
          </div>
        )}

        {/* Products table */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-ox-muted gap-2">
            <Loader2 size={20} className="animate-spin" />
            Carregando...
          </div>
        ) : (
          <div className="bg-ox-surface border border-ox-border rounded-2xl overflow-hidden">
            {filtered.length === 0 ? (
              <p className="text-center text-ox-muted py-16 text-sm">Nenhum produto encontrado</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ox-border text-ox-muted text-xs font-semibold uppercase tracking-wider">
                    <th className="text-left px-5 py-3">Produto</th>
                    <th className="text-left px-5 py-3 hidden sm:table-cell">Categoria</th>
                    <th className="text-right px-5 py-3">Preço</th>
                    <th className="text-center px-5 py-3 hidden md:table-cell">Popular</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr
                      key={p.id}
                      className={`border-b border-ox-border last:border-0 hover:bg-ox-black/30 transition-colors ${i % 2 === 0 ? '' : ''}`}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-ox-border"
                          />
                          <span className="text-white text-sm font-semibold">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell">
                        <span className="text-ox-muted text-xs border border-ox-border px-2.5 py-1 rounded-full">
                          {CATEGORY_LABEL[p.category]}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="text-ox-green font-bold text-sm">
                          {p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center hidden md:table-cell">
                        {p.popular && <Flame size={15} className="text-ox-yellow mx-auto" />}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setModal(p)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-ox-muted hover:text-white hover:bg-ox-border transition-all"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-ox-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      {modal && (
        <ProductModal
          product={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
          token={token}
        />
      )}
    </div>
  )
}
