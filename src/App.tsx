import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import { CartProvider } from "./context/CartContext"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import StorePage from "./pages/StorePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import CartPage from "./pages/CartPage"

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Box bg="bg" minH="100vh" display="flex" flexDirection="column">
          <Navbar />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
        <Toaster />
      </BrowserRouter>
    </CartProvider>
  )
}
