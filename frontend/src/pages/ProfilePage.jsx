import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const navigate = useNavigate();
    const [user] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Coffee Street, Brew City, BC 12345'
    });

    const [orderHistory] = useState([
        {
            id: 1,
            date: '2024-01-15',
            items: ['Espresso', 'Cappuccino', 'Croissant'],
            total: 9.50,
            status: 'Delivered'
        },
        {
            id: 2,
            date: '2024-01-10',
            items: ['Latte', 'Muffin'],
            total: 6.50,
            status: 'Delivered'
        },
        {
            id: 3,
            date: '2024-01-05',
            items: ['Americano', 'Tea'],
            total: 5.00,
            status: 'Delivered'
        }
    ]);

    const handleLogout = () => {
        // This would handle actual logout logic
        alert('Logged out successfully!');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
            {/* Header */}
            <div className="text-center mb-6 pt-8">
                <div className="w-20 h-20 bg-brown-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                    👤
                </div>
                <h1 className="text-2xl font-bold text-brown-800 mb-2">Profile</h1>
                <p className="text-brown-600">Manage your account</p>
            </div>

            {/* User Information */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-lg font-semibold text-brown-800 mb-4">Personal Information</h2>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-brown-600">Name:</span>
                        <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-brown-600">Email:</span>
                        <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-brown-600">Phone:</span>
                        <span className="font-medium">{user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-brown-600">Address:</span>
                        <span className="font-medium text-right max-w-xs">{user.address}</span>
                    </div>
                </div>
                <button className="mt-4 w-full bg-brown-100 text-brown-800 py-2 rounded-lg hover:bg-brown-200 transition-colors">
                    Edit Profile
                </button>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-lg font-semibold text-brown-800 mb-4">Order History</h2>
                <div className="space-y-4">
                    {orderHistory.map((order) => (
                        <div key={order.id} className="border-b border-brown-100 pb-3 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-medium text-brown-800">Order #{order.id}</p>
                                    <p className="text-sm text-brown-600">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-brown-800">${order.total.toFixed(2)}</p>
                                    <p className="text-sm text-green-600">{order.status}</p>
                                </div>
                            </div>
                            <p className="text-sm text-brown-600">
                                {order.items.join(', ')}
                            </p>
                        </div>
                    ))}
                </div>
                <button className="mt-4 w-full bg-brown-100 text-brown-800 py-2 rounded-lg hover:bg-brown-200 transition-colors">
                    View All Orders
                </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 mb-6">
                <button className="w-full bg-white rounded-lg p-4 shadow-md text-left hover:bg-brown-50 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">⚙️</span>
                            <span className="font-medium text-brown-800">Settings</span>
                        </div>
                        <span className="text-brown-400">&gt;</span>
                    </div>
                </button>

                <button className="w-full bg-white rounded-lg p-4 shadow-md text-left hover:bg-brown-50 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">💳</span>
                            <span className="font-medium text-brown-800">Payment Methods</span>
                        </div>
                        <span className="text-brown-400">&gt;</span>
                    </div>
                </button>

                <button className="w-full bg-white rounded-lg p-4 shadow-md text-left hover:bg-brown-50 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">📍</span>
                            <span className="font-medium text-brown-800">Delivery Addresses</span>
                        </div>
                        <span className="text-brown-400">&gt;</span>
                    </div>
                </button>

                <button className="w-full bg-white rounded-lg p-4 shadow-md text-left hover:bg-brown-50 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">❓</span>
                            <span className="font-medium text-brown-800">Help & Support</span>
                        </div>
                        <span className="text-brown-400">&gt;</span>
                    </div>
                </button>
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
                Logout
            </button>
        </div>
    );
}

export default ProfilePage; 