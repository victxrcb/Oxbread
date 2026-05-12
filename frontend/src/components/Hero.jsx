import { ArrowDown, Star } from 'lucide-react'
import { useEffect, useRef } from 'react'
import FadeIn from './FadeIn'
import { navigateTo } from '../utils/scroll'

export default function Hero() {
  const bgRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background com parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1920&q=80')",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-ox-black via-ox-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ox-black via-transparent to-ox-black/60" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ox-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-2xl">

          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 bg-ox-green/20 border border-ox-green/40 text-ox-green px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
              <Star size={12} fill="currentColor" />
              Hamburgueria Artesanal — Est. 2023
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Artesanal,{' '}
              <span className="text-ox-green">Intenso</span>
              ,{' '}
              <br />
              Irresistível.
            </h1>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="text-ox-muted text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              Smash burgers feitos na hora com ingredientes selecionados.
              Cada mordida conta uma história.
            </p>
          </FadeIn>

          <FadeIn delay={450}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#menu"
                onClick={e => { e.preventDefault(); navigateTo('#menu') }}
                className="inline-flex items-center justify-center gap-2 bg-ox-green hover:bg-ox-green-hover text-white font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-ox-green/30"
              >
                Ver Cardápio
              </a>
              <a
                href="#sobre"
                onClick={e => { e.preventDefault(); navigateTo('#sobre') }}
                className="inline-flex items-center justify-center gap-2 border border-ox-green/50 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:border-ox-green hover:shadow-[0_0_16px_rgba(27,107,27,0.7),0_0_32px_rgba(27,107,27,0.3)] hover:bg-ox-green/10"
              >
                Nossa História
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={600}>
            <div className="flex items-center gap-8 mt-14 pt-10 border-t border-ox-border/50">
              {[
                { value: '14+', label: 'Burgers no cardápio' },
                { value: '4.9', label: 'Avaliação média' },
                { value: '2023', label: 'Fundação' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-ox-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#menu"
        onClick={e => { e.preventDefault(); navigateTo('#menu') }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ox-muted hover:text-white transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  )
}
