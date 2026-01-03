import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Specials from './pages/Specials';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/Admin/Auth/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import MenuManager from './pages/Admin/MenuManager';
import SpecialsManager from './pages/Admin/SpecialsManager';
import BookingsReviews from './pages/Admin/BookingsReviews';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
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
                                <main className="flex-grow">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/menu" element={<Menu />} />
                                        <Route path="/specials" element={<Specials />} />
                                        <Route path="/booking" element={<Booking />} />
                                        <Route path="/contact" element={<Contact />} />
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
    );
}

export default App;
