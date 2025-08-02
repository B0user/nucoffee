import axios from 'axios';

// Load from .env
const CHAT_IDS = process.env.TELEGRAM_CHAT_IDS?.split(',') || [];
const API_URL = process.env.TELEGRAM_NOTIFICATION_URL;


export const sendOrderNotification = async (order, user) => {
    try {
        const formattedItems = order.items.map((item) => ({
            name: item.name || 'Unknown Item',
            quantity: item.quantity,
            price: item.price,
        }));

        const payloadBase = {
            order: {
                items: formattedItems,
                total: order.totalCost,
            },
            client: order.client
        };

        // Loop over each chat ID and send notification
        for (const chatId of CHAT_IDS) {
            const payload = { ...payloadBase, chatId: chatId.trim() };
            console.log('payload is:', payload);
            console.log('API_URL is:', API_URL);

            await axios.post(API_URL, payload);
        }

        console.log('✅ Telegram notifications sent');
    } catch (error) {
        console.error('❌ Failed to send Telegram notification:', error.message);
    }
};

const sendStatusUpdate = async (orderId, oldStatus, newStatus, user) => {
    // Optional: implement similar logic if needed
};

export default {
    sendOrderNotification,
    sendStatusUpdate
};
