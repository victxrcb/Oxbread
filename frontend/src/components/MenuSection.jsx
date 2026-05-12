import { useState } from 'react'
import { Flame, Loader2 } from 'lucide-react'
import { categories } from '../data/menu'
import { useProducts } from '../hooks/useProducts'
import ProductCard from './ProductCard'
import FadeIn from './FadeIn'

export default function MenuSection() {
  const [active, setActive] = useState('all')
  const { products, loading } = useProducts()

  const filtered =
    active === 'all'     ? products :
    active === 'popular' ? products.filter(i => i.popular) :
    products.filter(i => i.category === active)

  return (
    <section id="menu" className="py-20 bg-ox-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-12">
            <p className="text-ox-green text-xs font-bold uppercase tracking-[0.3em] mb-2">
              — Cardápio
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Escolha o seu{' '}
              <span className="text-ox-green">favorito</span>
            </h2>
          </div>
        </FadeIn>

        {/* Category tabs */}
        <FadeIn direction="up" delay={150}>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  cat.id === 'popular'
                    ? active === cat.id
                      ? 'bg-ox-yellow border-ox-yellow text-ox-black shadow-lg shadow-ox-yellow/25'
                      : 'bg-transparent border-ox-border text-ox-muted hover:border-ox-yellow/50 hover:text-ox-yellow'
                    : active === cat.id
                      ? 'bg-ox-green border-ox-green text-white shadow-lg shadow-ox-green/25'
                      : 'bg-transparent border-ox-border text-ox-muted hover:border-white/30 hover:text-white'
                }`}
              >
                {cat.id === 'popular' && <Flame size={13} />}
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid com cards em stagger */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-ox-muted gap-2">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Carregando cardápio...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item, i) => (
              <FadeIn
                key={`${active}-${item.id}`}
                direction="up"
                delay={Math.min(i, 7) * 80}
              >
                <ProductCard item={item} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
