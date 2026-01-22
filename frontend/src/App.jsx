import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import About from './pages/About';
import OrderOnline from './pages/OrderOnline';
import Cart from './pages/Cart';

// Admin Pages
import AdminLogin from './pages/Admin/Auth/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import MenuManager from './pages/Admin/MenuManager';
import SpecialsManager from './pages/Admin/SpecialsManager';
import BookingsReviews from './pages/Admin/BookingsReviews';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <LanguageProvider>
            <CartProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <div className="App min-h-screen flex flex-col bg-gray-50">
                        {/* Toast Notifications */}
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />

                        {/* Main Routes */}
                        <Routes>
                            {/* Public Routes with Header/Footer */}
                            <Route
                                path="/*"
                                element={
                                    <>
                                        <Header />
                                        <CartSidebar />
                                        <main className="flex-grow">
                                            <Routes>
                                                <Route path="/" element={<Home />} />
                                                <Route path="/menu" element={<Menu />} />
                                                <Route path="/gallery" element={<Gallery />} />
                                                <Route path="/booking" element={<Booking />} />
                                                <Route path="/contact" element={<Contact />} />
                                                <Route path="/about" element={<About />} />
                                                <Route path="/order-online" element={<OrderOnline />} />
                                                <Route path="/cart" element={<Cart />} />
                                            </Routes>
                                        </main>
                                        <Footer />
                                    </>
                                }
                            />

                            {/* Admin Routes (no Header/Footer) */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route
                                path="/admin/*"
                                element={
                                    <ProtectedRoute>
                                        <Routes>
                                            <Route path="dashboard" element={<AdminDashboard />} />
                                            <Route path="menu" element={<MenuManager />} />
                                            <Route path="specials" element={<SpecialsManager />} />
                                            <Route path="bookings-reviews" element={<BookingsReviews />} />
                                        </Routes>
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </div>
                </Router>
            </CartProvider>
        </LanguageProvider>
    );
}

export default App;
