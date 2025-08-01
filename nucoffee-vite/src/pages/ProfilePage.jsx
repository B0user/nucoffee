import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const navigate = useNavigate();
    const [user] = useState({
        name: 'Иван Иванов',
        email: 'ivan.ivanov@example.com',
        phone: '+7 (777) 123-45-67',
        address: 'ул. Кофейная, 123, Алматы, 050000'
    });

    const [orderHistory] = useState([
        {
            id: 1,
            date: '2024-01-15',
            items: ['Айс Латте', 'Мохито Лимонад', 'Сендвич'],
            total: 2800,
            status: 'Доставлен'
        },
        {
            id: 2,
            date: '2024-01-10',
            items: ['Киви Лайм Лимонад', 'Сытый Пончик'],
            total: 1400,
            status: 'Доставлен'
        },
        {
            id: 3,
            date: '2024-01-05',
            items: ['Гранат Малина Лимонад', 'Шоколадный Моти'],
            total: 1500,
            status: 'Доставлен'
        }
    ]);

    const handleLogout = () => {
        // This would handle actual logout logic
        alert('Успешно вышли из системы!');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#EEECD8] p-4 pb-20">
            {/* Header */}
            <div className="text-center mb-6 pt-8">
                <div className="w-20 h-20 bg-[#FFD483] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                    👤
                </div>
                <h1 className="text-2xl font-bold text-[#734E46] mb-2">Профиль</h1>
                <p className="text-[#734E46]">Управление аккаунтом</p>
            </div>

            {/* User Information */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-lg font-semibold text-[#734E46] mb-4">Личная информация</h2>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-[#734E46]">Имя:</span>
                        <span className="font-medium text-[#734E46]">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#734E46]">Email:</span>
                        <span className="font-medium text-[#734E46]">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#734E46]">Телефон:</span>
                        <span className="font-medium text-[#734E46]">{user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#734E46]">Адрес:</span>
                        <span className="font-medium text-right max-w-xs text-[#734E46]">{user.address}</span>
                    </div>
                </div>
                <button className="mt-4 w-full bg-[#FFD483] text-[#734E46] py-2 rounded-lg hover:bg-[#f0c870] transition-colors">
                    Редактировать профиль
                </button>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-lg font-semibold text-[#734E46] mb-4">История заказов</h2>
                <div className="space-y-4">
                    {orderHistory.map((order) => (
                        <div key={order.id} className="border-b border-[#FFD483] pb-3 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-medium text-[#734E46]">Заказ #{order.id}</p>
                                    <p className="text-sm text-[#734E46]">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-[#734E46]">₸{order.total.toFixed(0)}</p>
                                    <p className="text-sm text-green-600">{order.status}</p>
                                </div>
                            </div>
                            <p className="text-sm text-[#734E46]">
                                {order.items.join(', ')}
                            </p>
                        </div>
                    ))}
                </div>
                <button className="mt-4 w-full bg-[#FFD483] text-[#734E46] py-2 rounded-lg hover:bg-[#f0c870] transition-colors">
                    Посмотреть все заказы
                </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 mb-6">
                <button className="w-full bg-white rounded-lg p-4 shadow-md text-left hover:bg-[#FFD483] transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">⚙️</span>
                            <span className="font-medium text-[#734E46]">Настройки</span>
                        </div>
                        <span className="text-[#734E46]">&gt;</span>
                    </div>
                </button>

                <button className="w-full bg-white rounded-lg p-4 shadow-md text-left hover:bg-[#FFD483] transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">💳</span>
                            <span className="font-medium text-[#734E46]">Способы оплаты</span>
                        </div>
                        <span className="text-[#734E46]">&gt;</span>
                    </div>
                </button>

                <button className="w-full bg-white rounded-lg p-4 shadow-md text-left hover:bg-[#FFD483] transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">📍</span>
                            <span className="font-medium text-[#734E46]">Адреса доставки</span>
                        </div>
                        <span className="text-[#734E46]">&gt;</span>
                    </div>
                </button>

                <button className="w-full bg-white rounded-lg p-4 shadow-md text-left hover:bg-[#FFD483] transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">❓</span>
                            <span className="font-medium text-[#734E46]">Помощь и поддержка</span>
                        </div>
                        <span className="text-[#734E46]">&gt;</span>
                    </div>
                </button>
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
                Выйти
            </button>
        </div>
    );
}

export default ProfilePage; 