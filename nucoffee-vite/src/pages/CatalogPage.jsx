import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from "framer-motion";


function CatalogPage() {
    const navigate = useNavigate();
    const { cart, addToCart, updateQuantity, removeFromCart, getCartCount } = useCart();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal();
            }
        };

        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    const touchStartY = useRef(null);

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        if (!touchStartY.current) return;

        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchStartY.current;

        // Swipe threshold in px
        if (deltaY > 100) {
            closeModal();
            touchStartY.current = null;
        }
    };



    const menuItems = [
        {
            id: 1,
            name: 'Айс Латте',
            price: 1200,
            description: 'Освежающий холодный латте',
            category: 'Напитки',
            image: '/catalog/айс латте.jpeg'
        },
        {
            id: 2,
            name: 'Мохито Лимонад',
            price: 800,
            description: 'Освежающий лимонад с мятой',
            category: 'Напитки',
            image: '/catalog/мохито лимонад.jpeg'
        },
        {
            id: 3,
            name: 'Киви Лайм Лимонад',
            price: 900,
            description: 'Освежающий лимонад с киви и лаймом',
            category: 'Напитки',
            image: '/catalog/киви лайм лимонад.jpeg'
        },
        {
            id: 4,
            name: 'Гранат Малина Лимонад',
            price: 900,
            description: 'Освежающий лимонад с гранатом и малиной',
            category: 'Напитки',
            image: '/catalog/гранат малина лимонад.jpeg'
        },
        {
            id: 5,
            name: 'Бутер',
            price: 600,
            description: 'Свежий бутерброд',
            category: 'Еда',
            image: '/catalog/бутер.jpeg'
        },
        {
            id: 6,
            name: 'Сендвич',
            price: 800,
            description: 'Сытный сендвич',
            category: 'Еда',
            image: '/catalog/сендвич.jpeg'
        },
        {
            id: 7,
            name: 'Жесткий Сендвич',
            price: 1000,
            description: 'Плотный сендвич',
            category: 'Еда',
            image: '/catalog/жесткий сендвич.jpeg'
        },
        {
            id: 8,
            name: 'Куриный Круасанчикс',
            price: 1200,
            description: 'Круасан с курицей',
            category: 'Еда',
            image: '/catalog/куриный круасанчикс.jpeg'
        },
        {
            id: 9,
            name: 'Френчдог',
            price: 700,
            description: 'Классический френчдог',
            category: 'Еда',
            image: '/catalog/френчдог.jpeg'
        },
        {
            id: 10,
            name: 'Салат Цезарь',
            price: 1500,
            description: 'Свежий салат Цезарь',
            category: 'Еда',
            image: '/catalog/салат цезарь.jpeg'
        },
        {
            id: 11,
            name: 'Сытый Пончик',
            price: 500,
            description: 'Вкусный пончик',
            category: 'Десерты',
            image: '/catalog/сытый пончик.jpeg'
        },
        {
            id: 12,
            name: 'Шоколадный Моти',
            price: 600,
            description: 'Моти с шоколадом',
            category: 'Десерты',
            image: '/catalog/шоколадный моти.jpeg'
        },
        {
            id: 13,
            name: 'Фисташковый Моти',
            price: 600,
            description: 'Моти с фисташками',
            category: 'Десерты',
            image: '/catalog/фисташковый моти.jpeg'
        },
        {
            id: 14,
            name: 'Баунти Моти',
            price: 600,
            description: 'Моти со вкусом баунти',
            category: 'Десерты',
            image: '/catalog/баунти моти.jpeg'
        }
    ];

    const openModal = (item) => {
        setSelectedItem(item);
        const currentCartQuantity = getCartQuantity(item.id);
        setQuantity(currentCartQuantity + 1); // Start with current cart quantity + 1
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setQuantity(1);
    };

    const handleAddToCart = () => {
        if (selectedItem) {
            const currentCartQuantity = getCartQuantity(selectedItem.id);
            const quantityToAdd = quantity - currentCartQuantity;
            
            if (quantityToAdd > 0) {
                // Add the difference
                addToCart(selectedItem, quantityToAdd);
            } else if (quantityToAdd < 0) {
                // Remove the difference (negative)
                updateQuantity(selectedItem.id, quantity);
            }
            closeModal();
        }
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            removeFromCart(itemToDelete.id);
            setShowDeleteModal(false);
            setItemToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const getCartQuantity = (itemId) => {
        const cartItem = cart.find(item => item.id === itemId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <div className="min-h-screen bg-[#EEECD8] p-4 pb-20">
            {/* Header */}
            <div className="text-center mb-6 pt-8">
                <h1 className="text-2xl font-bold text-[#734E46] mb-2">Меню</h1>
                <p className="text-[#734E46]">Выберите любимые блюда</p>
            </div>

            {/* Cart Badge */}
            {getCartCount() > 0 && (
                <div className="fixed top-4 right-4 bg-[#1223A1] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
                    {getCartCount()}
                </div>
            )}

            {/* Menu Items */}
            <div className="grid grid-cols-1 gap-4">
                {menuItems.map((item) => {
                    const cartQuantity = getCartQuantity(item.id);
                    return (
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
                                        <p className="text-sm text-[#734E46]">{item.description}</p>
                                        <p className="text-sm text-[#734E46]">{item.category}</p>
                                        {cartQuantity > 0 && (
                                            <p className="text-sm text-[#1223A1] font-medium">
                                                В корзине: {cartQuantity}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-[#734E46]">₸{item.price.toFixed(0)}</p>
                                    <div className="flex space-x-2 mt-2">
                                        <button
                                            onClick={() => openModal(item)}
                                            className="bg-[#1223A1] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#0f1d8a] transition-colors"
                                        >
                                            Добавить
                                        </button>
                                        {cartQuantity > 0 && (
                                            <button
                                                onClick={() => handleDeleteClick(item)}
                                                className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        )}
                                        {/* {cartQuantity > 0 && (
                                            <button
                                                onClick={() => navigate('/cart')}
                                                className="bg-[#FFD483] text-[#734E46] px-3 py-2 rounded-lg text-sm hover:bg-[#f0c870] transition-colors"
                                            >
                                                Корзина
                                            </button>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Floating Cart Button */}
            {getCartCount() > 0 && (
                <div className="fixed bottom-20 right-4">
                    <button 
                        onClick={() => navigate('/cart')}
                        className="bg-[#1223A1] text-white p-4 rounded-full shadow-lg hover:bg-[#0f1d8a] transition-colors"
                    >
                        🛒 {getCartCount()}
                    </button>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
            {showModal && selectedItem && (
                <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                <motion.div
                    ref={modalRef}
                    className="bg-white w-full h-1/2 rounded-t-3xl p-6"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    {/* Your modal content here */}
                    <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-[#734E46]">{selectedItem.name}</h2>
                            <button 
                                onClick={closeModal}
                                className="text-[#734E46] text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-24 h-24 bg-[#FFD483] rounded-lg flex items-center justify-center overflow-hidden">
                                <img 
                                    src={selectedItem.image} 
                                    alt={selectedItem.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-full bg-[#FFD483] rounded-lg flex items-center justify-center text-3xl" style={{display: 'none'}}>
                                    🍽️
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-[#734E46] mb-2">{selectedItem.description}</p>
                                <p className="text-lg font-bold text-[#734E46]">₸{selectedItem.price.toFixed(0)}</p>
                                {getCartQuantity(selectedItem.id) > 0 && (
                                    <p className="text-sm text-[#1223A1] font-medium mt-2">
                                        В корзине: {getCartQuantity(selectedItem.id)}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 bg-[#FFD483] text-[#734E46] rounded-full flex items-center justify-center text-xl font-bold"
                            >
                                -
                            </button>
                            <span className="text-2xl font-bold text-[#734E46] w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 bg-[#1223A1] text-white rounded-full flex items-center justify-center text-xl font-bold"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-[#1223A1] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#0f1d8a] transition-colors"
                        >
                            {quantity > getCartQuantity(selectedItem.id) ? 'Добавить в корзину' : 'Обновить количество'}
                        </button>
                        
                        <p className="text-center text-sm text-[#734E46] mt-2">
                            ₸{(selectedItem.price * quantity).toFixed(0)}
                        </p>
                </motion.div>
                </motion.div>
            )}
            </AnimatePresence>

            <AnimatePresence>
            {showDeleteModal && itemToDelete && (
                <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-[#734E46] mb-4">Удалить из корзины</h2>
                        <p className="text-[#734E46] mb-6">
                            Вы уверены, что хотите удалить "{itemToDelete.name}" из корзины?
                        </p>
                        
                        <div className="flex space-x-3">
                            <button
                                onClick={handleCancelDelete}
                                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
                            >
                                Удалить
                            </button>
                        </div>
                    
                </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
}

export default CatalogPage; 