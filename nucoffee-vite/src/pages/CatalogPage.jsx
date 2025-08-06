import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from "framer-motion";
import items from '../assets/items.json';
import { Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CatalogPage() {
    const navigate = useNavigate();
    const { cart, addToCart, updateQuantity, removeFromCart, getCartCount } = useCart();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [quantity, setQuantity] = useState(1);


    const categories = [
        'Все',
        // 'Кофе с молоком',
        'Еда',
        'Айс напитки',
        // 'Чёрный кофе',
        // 'Матча и чай',
        // 'Какао',
        // 'Новинки',
    ];
    
    const [selectedCategory, setSelectedCategory] = useState('Все');
    
    const filteredItems = selectedCategory === 'Все'
    ? items
    : items.filter(item => item.category === selectedCategory);
      
    

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
            <div className="max-w-screen-lg mx-auto px-4 overflow-x-hidden">
                
            <div className="mb-4 overflow-x-auto w-[80vw]">
                <Tabs
                    value={selectedCategory}
                    onChange={(e, newValue) => setSelectedCategory(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    {categories.map((category) => (
                        <Tab
                            key={category}
                            label={category}
                            value={category}
                            sx={{
                                fontWeight: 600,
                                textTransform: 'none',
                                color: '#734E46',
                                minWidth: 'fit-content'
                            }}
                        />
                    ))}
                </Tabs>
            </div>




                {/* Menu Items */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    {filteredItems.map((item) => {
                        const cartQuantity = getCartQuantity(item.id);
                        return (
                            <div 
                                key={item.id}
                                onClick={() => openModal(item)}
                                className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow flex flex-col relative"
                                >
                                {/* Quantity Badge */}
                                {/* Количество + кнопка удаления */}
                                {cartQuantity > 0 && (
                                    <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                                    <div className="bg-[#1223A1] text-white text-xs font-semibold px-2 py-1 rounded-full">
                                        {cartQuantity} в корзине
                                    </div>
                                    <button
                                        onClick={(e) => {
                                        e.stopPropagation(); // чтобы не открывалась модалка
                                        removeFromCart(item.id); // твоя функция удаления
                                        }}
                                        className="text-white bg-red-500 hover:bg-red-600 w-6 h-6 flex items-center justify-center rounded-full"
                                        title="Удалить из корзины"
                                        >
                                        <CloseIcon sx={{ fontSize: 16 }} />
                                        </button>
                                    </div>
                                )}

                                {/* Image Section */}
                                <div className="w-full h-40 bg-[#FFD483] rounded-t-lg overflow-hidden flex items-center justify-center">
                                    <img 
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                    />
                                    <div className="w-full h-full bg-[#FFD483] flex items-center justify-center text-3xl" style={{ display: 'none' }}>
                                    🍽️
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="p-4 flex flex-col h-1/2 justify-between">
                                    <div>
                                    <h3 className="font-semibold text-[#734E46] text-lg">{item.name}</h3>
                                    </div>
                                    <div className="mt-1 flex justify-between items-center text-[#734E46] font-medium text-base">
                                    <span>₸{item.price.toFixed(0)}</span>
                                    <span className="text-[#1223A1] text-xl">→</span>
                                    </div>
                                </div>
                                </div>

                        );
                    })}
                </div>
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