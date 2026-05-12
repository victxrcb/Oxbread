import { Flame } from 'lucide-react'
import { menuItems } from '../data/menu'
import ProductCard from './ProductCard'
import FadeIn from './FadeIn'

const populares = menuItems.filter(i => i.popular)

export default function PopularesSection() {
  return (
    <section className="py-20 bg-ox-black border-t border-ox-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn direction="up">
          <div className="mb-12">
            <p className="text-ox-yellow text-xs font-bold uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
              <Flame size={13} />
              Mais pedidos
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Os{' '}
              <span className="text-ox-yellow">Populares</span>
            </h2>
            <p className="text-ox-muted mt-3 text-base max-w-md">
              Os favoritos da galera — itens que mais saem aqui na OxBread.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {populares.map((item, i) => (
            <FadeIn key={item.id} direction="up" delay={i * 80}>
              <ProductCard item={item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
