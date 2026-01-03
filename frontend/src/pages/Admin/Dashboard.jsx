import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, UtensilsCrossed, Sparkles, Calendar, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const adminEmail = localStorage.getItem('adminEmail');

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        navigate('/admin/login');
    };

    const menuItems = [
        { icon: UtensilsCrossed, title: 'Menu Manager', description: 'Add, edit, and delete menu items', path: '/admin/menu', color: 'bg-blue-500' },
        { icon: Sparkles, title: 'Daily Specials', description: 'Manage daily specials and schedules', path: '/admin/specials', color: 'bg-purple-500' },
        { icon: Calendar, title: 'Bookings & Reviews', description: 'View bookings and moderate reviews', path: '/admin/bookings-reviews', color: 'bg-green-500' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {adminEmail}</p>
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/" className="btn-outline flex items-center space-x-2">
                                <Home size={20} />
                                <span>View Website</span>
                            </Link>
                            <button onClick={handleLogout} className="btn-danger flex items-center space-x-2">
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="card hover-lift p-6 transition-all duration-300"
                        >
                            <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                                <item.icon className="text-white" size={24} />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                            <p className="text-gray-600">{item.description}</p>
                        </Link>
                    ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="card p-6">
                        <p className="text-gray-600 mb-1">Total Menu Items</p>
                        <p className="text-3xl font-bold text-primary-600">-</p>
                    </div>
                    <div className="card p-6">
                        <p className="text-gray-600 mb-1">Active Specials</p>
                        <p className="text-3xl font-bold text-purple-600">-</p>
                    </div>
                    <div className="card p-6">
                        <p className="text-gray-600 mb-1">Pending Bookings</p>
                        <p className="text-3xl font-bold text-green-600">-</p>
                    </div>
                    <div className="card p-6">
                        <p className="text-gray-600 mb-1">Total Reviews</p>
                        <p className="text-3xl font-bold text-blue-600">-</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
