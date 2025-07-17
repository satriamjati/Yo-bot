const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const app = express();

// Keep-alive server
app.get('/', (req, res) => {
  res.send('Bot is alive!');
});
app.listen(3000, () => {
  console.log('Web server running on port 3000');
});

client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!timestamp')) {
    const input = message.content.slice(10).trim();
    const date = new Date(input);

    if (isNaN(date.getTime())) {
      message.reply('❌ Invalid date. Use format like `YYYY-MM-DD HH:MM`');
      return;
    }

    const unix = Math.floor(date.getTime() / 1000);
    message.reply(`🕒 <t:${unix}:T> | <t:${unix}:R>`);
  }
});

client.login(process.env.TOKEN);
