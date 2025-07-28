import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
            {/* Header */}
            <div className="text-center mb-8 pt-8">
                <h1 className="text-3xl font-bold text-brown-800 mb-2">NuCoffee</h1>
                <p className="text-brown-600">Your perfect coffee companion</p>
            </div>

            {/* Welcome Section */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-xl font-semibold text-brown-800 mb-3">Welcome! ☕</h2>
                <p className="text-brown-600 mb-4">
                    Discover our carefully crafted coffee selection and place your order with ease.
                </p>
                <button 
                    onClick={() => navigate('/catalog')}
                    className="bg-brown-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brown-700 transition-colors"
                >
                    Browse Menu
                </button>
            </div>

            {/* Featured Items */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                <h3 className="text-lg font-semibold text-brown-800 mb-4">Today's Specials</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-brown-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-2xl">☕</span>
                        </div>
                        <p className="text-sm font-medium text-brown-800">Espresso</p>
                        <p className="text-xs text-brown-600">$2.50</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-brown-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-2xl">🥛</span>
                        </div>
                        <p className="text-sm font-medium text-brown-800">Cappuccino</p>
                        <p className="text-xs text-brown-600">$3.50</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => navigate('/cart')}
                    className="bg-brown-600 text-white p-4 rounded-lg text-center hover:bg-brown-700 transition-colors"
                >
                    <div className="text-2xl mb-2">🛒</div>
                    <div className="text-sm font-medium">View Cart</div>
                </button>
                <button 
                    onClick={() => navigate('/profile')}
                    className="bg-brown-100 text-brown-800 p-4 rounded-lg text-center hover:bg-brown-200 transition-colors"
                >
                    <div className="text-2xl mb-2">👤</div>
                    <div className="text-sm font-medium">Profile</div>
                </button>
            </div>
        </div>
    );
}

export default HomePage; 