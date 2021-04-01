require("dotenv").config();

// "dev": "nodemon ./src/bot.js"
// Get client token
const token = ;      //process.env.DISCORDJS_BOT_TOKEN;

// Get the bot client
const { Client } = require("discord.js");
const client = new Client();

const welcome = require('./welcome');
const messages = require('./messages');

// Run the bot
client.on('ready', () => {
    // Start the bot
    client.user.setActivity("Jinglex's server", { type: "WATCHING" });
    console.log(`${client.user.tag} has logged in.`);
    welcome(client);
    messages(client);
});

// Log the bot in
client.login(token);
