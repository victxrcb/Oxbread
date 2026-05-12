import { Instagram, MapPin, Phone, Clock } from 'lucide-react'
import FadeIn from './FadeIn'

export default function Footer() {
  return (
    <footer id="footer" className="bg-ox-surface border-t border-ox-border">
      {/* About strip */}
      <section id="sobre" className="py-16 border-b border-ox-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
          <div>
            <p className="text-ox-green text-xs font-bold uppercase tracking-[0.3em] mb-3">
              — Nossa História
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-snug">
              Nascemos da paixão<br />
              pelo <span className="text-ox-green">bom burger</span>
            </h2>
            <p className="text-ox-muted leading-relaxed text-sm max-w-md">
              Fundada em 2023, a OxBread Burger chegou para trazer o smash burger de verdade
              para a nossa cidade. Cada lanche é feito na hora, com ingredientes frescos e
              selecionados, entregue com o calor de quem ama o que faz.
            </p>
          </div>
          </FadeIn>
          <FadeIn direction="right" delay={150}>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80"
                alt="Burger"
                className="rounded-2xl object-cover w-full aspect-square"
              />
              <img
                src="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80"
                alt="Drink"
                className="rounded-2xl object-cover w-full aspect-square mt-6"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-3 gap-8">
        {/* Brand */}
        <FadeIn direction="up" delay={0}>
        <div>
          <div className="mb-4">
            <img
              src="/logo.png"
              alt="OxBread Burger"
              className="h-14 w-14 object-contain"
            />
          </div>
          <p className="text-ox-muted text-xs leading-relaxed">
            Artesanal, Intenso, Irresistível.
          </p>
          <a
            href="  https://www.instagram.com/oxbread_burger/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-ox-muted hover:text-white transition-colors text-sm"
          >
            <Instagram size={16} />
            @oxbread_burger
          </a>
        </div>
        </FadeIn>

        {/* Info */}
        <FadeIn direction="up" delay={150}>
        <div className="space-y-3">
          <p className="text-white font-semibold text-sm mb-4">Informações</p>
          <div className="flex items-start gap-2 text-ox-muted text-sm">
            <MapPin size={14} className="mt-0.5 shrink-0 text-ox-green" />
            <span> Rua Tenente Antônio Fontes Pitanga, 1328 — Farolândia</span>
          </div>
          <div className="flex items-center gap-2 text-ox-muted text-sm">
            <Phone size={14} className="shrink-0 text-ox-green" />
            <span>(79) 98117-6177</span>
          </div>
          <div className="flex items-start gap-2 text-ox-muted text-sm">
            <Clock size={14} className="mt-0.5 shrink-0 text-ox-green" />
            <div>
              <p>Todos os dias das 17h às 00h</p>
              
            </div>
          </div>
        </div>
        </FadeIn>

        {/* Links */}
        <FadeIn direction="up" delay={300}>
        <div>
          <p className="text-white font-semibold text-sm mb-4">Navegação</p>
          <nav className="space-y-2">
            {[
              { label: 'Cardápio', href: '#menu' },
              { label: 'Nossa História', href: '#sobre' },
              { label: 'Contato', href: '#footer' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className="block text-ox-muted hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        </FadeIn>
      </div>

      {/* Copyright */}
      <div className="border-t border-ox-border py-5 text-center">
        <p className="text-ox-muted text-xs">
          © {new Date().getFullYear()} OxBread Burger. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
