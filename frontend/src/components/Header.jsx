import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'Início',   href: '#hero',   offset: 0  },
  { label: 'Cardápio', href: '#menu',   offset: -60  },
  { label: 'Sobre',    href: '#sobre',  offset: -20  },
  { label: 'Contato',  href: '#footer', offset: -100  },
]

import { smoothScrollTo, navigateTo } from '../utils/scroll'

export default function Header() {
  const { itemCount, setIsCartOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ox-black/90 backdrop-blur-md border-b border-ox-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); smoothScrollTo(0) }}
          className="group"
        >
          <img
            src="/logo.png"
            alt="OxBread Burger"
            className="h-11 w-11 object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(27,107,27,0.5)]"
          />
        </a>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); navigateTo(link.href, link.offset) }}
              className="relative text-ox-muted hover:text-white text-sm font-medium transition-colors group/link"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-ox-green rounded-full shadow-[0_0_8px_#1B6B1B] group-hover/link:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-ox-green hover:bg-ox-green-hover text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Meu Pedido</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-ox-yellow text-ox-black text-[10px] font-black rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden text-ox-muted hover:text-white transition-colors p-1"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ox-border bg-ox-surface px-4 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); navigateTo(link.href, link.offset, () => setMobileOpen(false)) }}
              className="relative w-fit text-ox-muted hover:text-white text-sm font-medium transition-colors group/link"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-ox-green rounded-full shadow-[0_0_8px_#1B6B1B] group-hover/link:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
