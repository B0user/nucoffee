import axios from 'axios';

const API_URL = 'http://localhost:2004/api/send-order'; // change to production domain when deploying

const sendOrderNotification = async (order, user) => {
    try {
        // Prepare items for message
        const formattedItems = order.items.map((item) => ({
            name: item.name || 'Unknown Item',
            quantity: item.quantity,
            price: item.price
        }));

        // Construct payload
        const payload = {
            chatId: user.telegramId, // or use a fixed admin ID if needed
            order: {
                items: formattedItems,
                total: order.totalAmount
            },
            client: {
                name: user.name,
                phone: user.phone || '—',
                email: user.email || '—'
            }
        };

        // Send to internal API
        await axios.post(API_URL, payload);
    } catch (error) {
        console.error('Failed to send Telegram notification:', error.message);
    }
};

const sendStatusUpdate = async (orderId, oldStatus, newStatus, user) => {
    // Optional: implement similar logic if needed
};

export default {
    sendOrderNotification,
    sendStatusUpdate
};
