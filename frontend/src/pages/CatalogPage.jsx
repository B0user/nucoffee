import React, { useState } from 'react';

function CatalogPage() {
    const [cart, setCart] = useState([]);

    const menuItems = [
        {
            id: 1,
            name: 'Espresso',
            price: 2.50,
            description: 'Strong Italian coffee',
            category: 'Coffee',
            image: '☕'
        },
        {
            id: 2,
            name: 'Cappuccino',
            price: 3.50,
            description: 'Espresso with steamed milk foam',
            category: 'Coffee',
            image: '🥛'
        },
        {
            id: 3,
            name: 'Latte',
            price: 4.00,
            description: 'Espresso with steamed milk',
            category: 'Coffee',
            image: '🥛'
        },
        {
            id: 4,
            name: 'Americano',
            price: 3.00,
            description: 'Espresso with hot water',
            category: 'Coffee',
            image: '☕'
        },
        {
            id: 5,
            name: 'Mocha',
            price: 4.50,
            description: 'Espresso with chocolate and milk',
            category: 'Coffee',
            image: '🍫'
        },
        {
            id: 6,
            name: 'Tea',
            price: 2.00,
            description: 'Various tea options',
            category: 'Tea',
            image: '🫖'
        },
        {
            id: 7,
            name: 'Croissant',
            price: 3.50,
            description: 'Buttery French pastry',
            category: 'Pastry',
            image: '🥐'
        },
        {
            id: 8,
            name: 'Muffin',
            price: 2.50,
            description: 'Fresh baked muffin',
            category: 'Pastry',
            image: '🧁'
        }
    ];

    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
            {/* Header */}
            <div className="text-center mb-6 pt-8">
                <h1 className="text-2xl font-bold text-brown-800 mb-2">Menu</h1>
                <p className="text-brown-600">Choose your favorite items</p>
            </div>

            {/* Cart Badge */}
            {getCartCount() > 0 && (
                <div className="fixed top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
                    {getCartCount()}
                </div>
            )}

            {/* Menu Items */}
            <div className="grid grid-cols-1 gap-4">
                {menuItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-brown-200 rounded-full flex items-center justify-center text-2xl">
                                    {item.image}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-brown-800">{item.name}</h3>
                                    <p className="text-sm text-brown-600">{item.description}</p>
                                    <p className="text-sm text-brown-500">{item.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-brown-800">${item.price.toFixed(2)}</p>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="mt-2 bg-brown-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-brown-700 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Cart Button */}
            {getCartCount() > 0 && (
                <div className="fixed bottom-20 right-4">
                    <button className="bg-brown-600 text-white p-4 rounded-full shadow-lg hover:bg-brown-700 transition-colors">
                        🛒 {getCartCount()}
                    </button>
                </div>
            )}
        </div>
    );
}

export default CatalogPage; 