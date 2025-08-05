const TelegramBot = require('node-telegram-bot-api');

async function sendTeligramMessage(message = '') {
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
    try {
        await bot.sendMessage(
            process.env.TELEGRAM_CHAT_ID,
            message,
            { parse_mode: 'Markdown' }
        );
    } catch (error) {
        if (error.response) {
            console.error("Telegram API response:", error.response.body);
        }
    }
}

module.exports = {
    sendTeligramMessage
}