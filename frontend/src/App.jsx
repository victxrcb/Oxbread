import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import CartSidebar from './components/CartSidebar'
import CheckoutModal from './components/CheckoutModal'
import ProductModal from './components/ProductModal'
import Footer from './components/Footer'
import AdminPage from './pages/AdminPage'

function Storefront() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-ox-black text-white">
        <Header />
        <main>
          <Hero />
          <MenuSection />
        </main>
        <Footer />
        <CartSidebar />
        <CheckoutModal />
        <ProductModal />
      </div>
    </CartProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Storefront />} />
      </Routes>
    </BrowserRouter>
  )
}
