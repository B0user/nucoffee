import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([
        {
            id: 1,
            name: 'Espresso',
            price: 2.50,
            quantity: 2,
            image: '☕'
        },
        {
            id: 2,
            name: 'Cappuccino',
            price: 3.50,
            quantity: 1,
            image: '🥛'
        },
        {
            id: 7,
            name: 'Croissant',
            price: 3.50,
            quantity: 1,
            image: '🥐'
        }
    ]);

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            setCart(prevCart => prevCart.filter(item => item.id !== itemId));
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleCheckout = () => {
        // This would integrate with payment processing
        alert('Order placed successfully! Payment processing would happen here.');
        setCart([]);
        navigate('/');
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
                <div className="text-center pt-20">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold text-brown-800 mb-4">Your cart is empty</h2>
                    <p className="text-brown-600 mb-6">Add some delicious items to get started!</p>
                    <button
                        onClick={() => navigate('/catalog')}
                        className="bg-brown-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brown-700 transition-colors"
                    >
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
            {/* Header */}
            <div className="text-center mb-6 pt-8">
                <h1 className="text-2xl font-bold text-brown-800 mb-2">Your Cart</h1>
                <p className="text-brown-600">{getTotalItems()} items</p>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
                {cart.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-brown-200 rounded-full flex items-center justify-center text-2xl">
                                    {item.image}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-brown-800">{item.name}</h3>
                                    <p className="text-sm text-brown-600">${item.price.toFixed(2)} each</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 bg-brown-200 text-brown-800 rounded-full flex items-center justify-center hover:bg-brown-300 transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 bg-brown-600 text-white rounded-full flex items-center justify-center hover:bg-brown-700 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 text-right">
                            <p className="font-semibold text-brown-800">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <h3 className="text-lg font-semibold text-brown-800 mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                        <span className="text-brown-600">Subtotal</span>
                        <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-brown-600">Tax</span>
                        <span className="font-medium">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-brown-600">Delivery</span>
                        <span className="font-medium">$1.00</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold text-brown-800">
                        <span>Total</span>
                        <span>${(getTotalPrice() * 1.08 + 1.00).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Checkout Button */}
            <button
                onClick={handleCheckout}
                className="w-full bg-brown-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-brown-700 transition-colors shadow-lg"
            >
                Proceed to Checkout
            </button>
        </div>
    );
}

export default CartPage; 