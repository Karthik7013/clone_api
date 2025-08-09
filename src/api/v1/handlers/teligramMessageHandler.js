const TelegramBot = require('node-telegram-bot-api');

async function sendTeligramMessage(message = '') {
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
    try {
        await bot.sendMessage(
            process.env.TELEGRAM_CHAT_ID,
            message
        );
    } catch (error) {
        throw error
    }
}

module.exports = {
    sendTeligramMessage
}