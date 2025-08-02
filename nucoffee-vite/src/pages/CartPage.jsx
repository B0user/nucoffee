import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AnimatePresence, motion } from "framer-motion";

// import { registerUser, createOrder } from '../services/api';

function CartPage() {
    const navigate = useNavigate();
    const { cart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const [showUserModal, setShowUserModal] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock user state - in real app this would come from context or localStorage
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [registeredUser, setRegisteredUser] = useState(null);

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleCheckout = () => {
        // Check if user is registered
        if (!isUserRegistered) {
            // Show registration modal
            setShowUserModal(true);
        } else {
            // User is registered, proceed with order creation
            handleCreateOrder();
        }
    };

    const handleUserSubmit = async () => {
        if (!userInfo.name || !userInfo.phone || !userInfo.email) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        setIsSubmitting(true);

        try {
            // Register user first
            const userResponse = await registerUser({
                name: userInfo.name,
                phone: userInfo.phone,
                email: userInfo.email
            });

            console.log('User registered:', userResponse);

            // Set user as registered
            setIsUserRegistered(true);
            setRegisteredUser(userResponse);

            // Close modal and proceed with order creation
            setShowUserModal(false);
            setUserInfo({ name: '', phone: '', email: '' });
            
            // Create order
            await handleCreateOrder();

        } catch (error) {
            console.error('Error registering user:', error);
            alert('Ошибка при регистрации. Пожалуйста, попробуйте снова.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCreateOrder = async () => {
        if (cart.length === 0) {
            alert('Корзина пуста');
            return;
        }

        setIsSubmitting(true);

        try {
            // Create order JSON
            const orderData = {
                client: {
                    name: registeredUser?.name || userInfo.name,
                    phone: registeredUser?.phone || userInfo.phone,
                    email: registeredUser?.email || userInfo.email
                },
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalCost: getTotalPrice()
            };

            console.log('Order Data:', JSON.stringify(orderData, null, 2));

            // Create order
            const orderResponse = await createOrder(orderData);

            console.log('Order created:', orderResponse);

            alert('Заказ успешно размещен! Здесь будет обработка платежа.');
            clearCart();
            navigate('/');

        } catch (error) {
            console.error('Error creating order:', error);
            alert('Ошибка при создании заказа. Пожалуйста, попробуйте снова.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#EEECD8] p-4 pb-20">
                <div className="text-center pt-20">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold text-[#734E46] mb-4">Ваша корзина пуста</h2>
                    <p className="text-[#734E46] mb-6">Добавьте вкусные блюда для начала!</p>
                    <button
                        onClick={() => navigate('/catalog')}
                        className="bg-[#1223A1] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0f1d8a] transition-colors"
                    >
                        Просмотреть меню
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#EEECD8] p-4 pb-20">
            {/* Header */}
            <div className="text-center mb-6 pt-8">
                <h1 className="text-2xl font-bold text-[#734E46] mb-2">Ваша корзина</h1>
                <p className="text-[#734E46]">{getTotalItems()} товаров</p>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
                {cart.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-[#FFD483] rounded-lg flex items-center justify-center overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-full h-full bg-[#FFD483] rounded-lg flex items-center justify-center text-2xl" style={{display: 'none'}}>
                                        🍽️
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[#734E46]">{item.name}</h3>
                                    <p className="text-sm text-[#734E46]">₸{item.price.toFixed(0)} за штуку</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 bg-[#FFD483] text-[#734E46] rounded-full flex items-center justify-center hover:bg-[#f0c870] transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center font-medium text-[#734E46]">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 bg-[#1223A1] text-white rounded-full flex items-center justify-center hover:bg-[#0f1d8a] transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 text-right">
                            <p className="font-semibold text-[#734E46]">
                                ₸{(item.price * item.quantity).toFixed(0)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <h3 className="text-lg font-semibold text-[#734E46] mb-4">Итого заказа</h3>
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                        <span className="text-[#734E46]">Подытог</span>
                        <span className="font-medium text-[#734E46]">₸{getTotalPrice().toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#734E46]">Доставка</span>
                        <span className="font-medium text-[#734E46]">₸0</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold text-[#734E46]">
                        <span>Итого</span>
                        <span>₸{(getTotalPrice() + 0).toFixed(0)}</span>
                    </div>
                </div>
            </div>

            {/* Checkout Button */}
            <button
                onClick={handleCheckout}
                className="w-full bg-[#1223A1] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#0f1d8a] transition-colors shadow-lg"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Обработка...' : 'Оформить заказ'}
            </button>

            {/* User Registration Modal */}
            {/* {showUserModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-[#734E46] mb-4">Регистрация</h2>
                        <p className="text-[#734E46] mb-4">Пожалуйста, введите ваши данные для оформления заказа</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#734E46] text-sm font-medium mb-2">
                                    ФИО *
                                </label>
                                <input
                                    type="text"
                                    value={userInfo.name}
                                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1223A1]"
                                    placeholder="Иван Иванов"
                                    disabled={isSubmitting}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-[#734E46] text-sm font-medium mb-2">
                                    Номер телефона (Kaspi) *
                                </label>
                                <input
                                    type="tel"
                                    value={userInfo.phone}
                                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1223A1]"
                                    placeholder="+77012345678"
                                    disabled={isSubmitting}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-[#734E46] text-sm font-medium mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1223A1]"
                                    placeholder="ivan@example.com"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowUserModal(false)}
                                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                                disabled={isSubmitting}
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleUserSubmit}
                                className="flex-1 bg-[#1223A1] text-white py-3 rounded-lg font-medium hover:bg-[#0f1d8a] transition-colors disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Обработка...' : 'Подтвердить'}
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
            <AnimatePresence>
            {showUserModal && (
                <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                <motion.div
                    className="bg-white rounded-lg p-6 w-full max-w-md"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <h2 className="text-xl font-bold text-[#734E46] mb-4">Регистрация</h2>
                        <p className="text-[#734E46] mb-4">Пожалуйста, введите ваши данные для оформления заказа</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#734E46] text-sm font-medium mb-2">
                                    ФИО *
                                </label>
                                <input
                                    type="text"
                                    value={userInfo.name}
                                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1223A1]"
                                    placeholder="Иван Иванов"
                                    disabled={isSubmitting}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-[#734E46] text-sm font-medium mb-2">
                                    Номер телефона (Kaspi) *
                                </label>
                                <input
                                    type="tel"
                                    value={userInfo.phone}
                                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1223A1]"
                                    placeholder="+77012345678"
                                    disabled={isSubmitting}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-[#734E46] text-sm font-medium mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1223A1]"
                                    placeholder="ivan@example.com"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowUserModal(false)}
                                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                                disabled={isSubmitting}
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleUserSubmit}
                                className="flex-1 bg-[#1223A1] text-white py-3 rounded-lg font-medium hover:bg-[#0f1d8a] transition-colors disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Обработка...' : 'Подтвердить'}
                            </button>
                        </div>
                </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
}

export default CartPage; 