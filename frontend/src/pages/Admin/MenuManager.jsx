import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search, Filter, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { toast } from 'react-toastify';

const MenuManager = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Entrantes',
        available: true
    });

    const categories = [
        'Entrantes',
        'Ramen y Sopas',
        'Poke Bowls',
        'Uramakis',
        'Uramakis Tempura',
        'Uramakis Plus',
        'Makis Oslo',
        'Nigiris',
        'Spring Rolls',
        'Temakis',
        'Sashimi and Geishas',
        'Combos',
        'Postres',
        'Bebidas'
    ];

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await api.get('/menu');
            if (response.data.success) {
                setMenuItems(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to load menu items');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                description: item.description || '',
                price: item.price,
                category: item.category,
                available: item.available
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                category: 'Entrantes',
                available: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                // Update
                const response = await api.put(`/menu/${editingItem._id}`, formData);
                if (response.data.success) {
                    toast.success('Item updated successfully');
                    fetchMenuItems();
                    setIsModalOpen(false);
                }
            } else {
                // Create
                const response = await api.post('/menu', formData);
                if (response.data.success) {
                    toast.success('Item created successfully');
                    fetchMenuItems();
                    setIsModalOpen(false);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/menu/${id}`);
                toast.success('Item deleted successfully');
                fetchMenuItems();
            } catch (error) {
                toast.error('Failed to delete item');
            }
        }
    };

    // Filter Logic
    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900">Menu Manager</h1>
                        <p className="text-gray-600">Manage your restaurant menu items</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/admin" className="btn-outline">Back to Dashboard</Link>
                        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
                            <Plus size={20} />
                            Add New Item
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="text-gray-400" size={20} />
                        <select
                            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>

                {/* List */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader className="animate-spin text-primary-600" size={40} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map(item => (
                            <div key={item._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-2">
                                                {item.category}
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                        </div>
                                        <span className="font-bold text-primary-600">€{item.price.toFixed(2)}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                        {item.description}
                                    </p>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <span className={`text-sm ${item.available ? 'text-green-600' : 'text-red-500'}`}>
                                            {item.available ? '● Available' : '● Unavailable'}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openModal(item)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold">
                                {editingItem ? 'Edit Item' : 'Add New Item'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (€)</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="available"
                                    name="available"
                                    checked={formData.available}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded border-gray-300"
                                />
                                <label htmlFor="available" className="text-sm font-medium text-gray-700">Available for order</label>
                            </div>
                            <div className="pt-4 flex gap-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 btn-outline">Cancel</button>
                                <button type="submit" className="flex-1 btn-primary">Save Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuManager;
