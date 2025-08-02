const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Настройки бота
const token = 'token here';
const bot = new TelegramBot(token);

// URL вашего Mini App
const miniAppUrl = 'https://nucoffee.kz';

// Настройки сервера
const port = 2004;
const webhookUrl = 'https://nucoffee.kz'; // Замените на ваш домен

// Включаем парсинг JSON
app.use(express.json());

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // ✅ User info
    const user = msg.from;
    const userInfo = {
        id: user.id,
        is_bot: user.is_bot,
        first_name: user.first_name,
        last_name: user.last_name || '',
        username: user.username || '',
        language_code: user.language_code || '',
        timestamp: new Date().toISOString()
    };

    // 📝 Log to console
    console.log('👤 New user:', userInfo);

    // 💾 Optionally write to a log file
    const fs = require('fs');
    fs.appendFileSync('user_log.json', JSON.stringify(userInfo) + ',\n');

    // 🎯 Send welcome + button
    const keyboard = {
        inline_keyboard: [[
            {
                text: 'Открыть Mini App',
                web_app: { url: miniAppUrl }
            }
        ]]
    };

    bot.sendMessage(chatId, 'Добро пожаловать! Нажмите на кнопку ниже, чтобы открыть Mini App:', {
        reply_markup: keyboard
    });
});

// Обработчик ошибок
bot.on('polling_error', (error) => {
    console.log(error);
});

// Маршрут для вебхука
app.post('/webhook', (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Установка вебхука
bot.setWebHook(`${webhookUrl}/webhook`)
    .then(() => {
        console.log('Вебхук успешно установлен');
    })
    .catch((error) => {
        console.error('Ошибка при установке вебхука:', error);
    });



// New API route to send order info via Telegram
app.post('/api/send-order', async (req, res) => {
    const { chatId, order, client } = req.body;

    if (!chatId || !order || !client) {
        return res.status(400).json({ error: 'Missing required fields: chatId, order, client' });
    }

    // Format order items
    const itemsList = order.items.map((item, index) => 
        `${index + 1}. ${item.name} x${item.quantity} - ${item.price}₸`
    ).join('\n');

    const message = `
🛍️ *Новый заказ!*

👤 *Клиент:*
Имя: ${client.name}
Телефон: ${client.phone}
Email: ${client.email}

🧾 *Заказ:*
${itemsList}

💰 *Сумма заказа:* ${order.total}₸
    `;

    try {
        await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        res.status(200).json({ success: true, message: 'Сообщение отправлено в Telegram' });
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
        res.status(500).json({ error: 'Не удалось отправить сообщение' });
    }
});




// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});