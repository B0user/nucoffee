import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#EEECD8] p-4">
            {/* Header */}
            <div className="text-center mb-8 pt-8">
                <img 
                    src="/nucoffee.svg" 
                    alt="NuCoffee" 
                    className="w-auto h-24 mx-auto mb-4"
                />
                <p className="text-[#734E46]">Ваш идеальный кофейный компаньон</p>
            </div>

            {/* Welcome Section */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-xl font-semibold text-[#734E46] mb-3">Добро пожаловать! ☕</h2>
                <p className="text-[#734E46] mb-4">
                    Откройте для себя нашу тщательно подобранную коллекцию кофе и легко размещайте заказы.
                </p>
                <button 
                    onClick={() => navigate('/catalog')}
                    className="bg-[#1223A1] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0f1d8a] transition-colors"
                >
                    Просмотреть меню
                </button>
            </div>

            {/* Featured Items */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                <h3 className="text-lg font-semibold text-[#734E46] mb-4">Специальные предложения дня</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#FFD483] rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-2xl">☕</span>
                        </div>
                        <p className="text-sm font-medium text-[#734E46]">Айс Латте</p>
                        <p className="text-xs text-[#734E46]">₸1200</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#FFD483] rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-2xl">🥛</span>
                        </div>
                        <p className="text-sm font-medium text-[#734E46]">Мохито Лимонад</p>
                        <p className="text-xs text-[#734E46]">₸800</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => navigate('/cart')}
                    className="bg-[#1223A1] text-white p-4 rounded-lg text-center hover:bg-[#0f1d8a] transition-colors"
                >
                    <div className="text-2xl mb-2">🛒</div>
                    <div className="text-sm font-medium">Корзина</div>
                </button>
                <button 
                    onClick={() => navigate('/profile')}
                    className="bg-[#FFD483] text-[#734E46] p-4 rounded-lg text-center hover:bg-[#f0c870] transition-colors"
                >
                    <div className="text-2xl mb-2">👤</div>
                    <div className="text-sm font-medium">Профиль</div>
                </button>
            </div>
        </div>
    );
}

export default HomePage; 