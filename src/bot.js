require("dotenv").config();

// Get client token
const token = process.env.DISCORDJS_BOT_TOKEN;
// Set up prefix for commands
const PREFIX = "!";

// Get the bot client
const { Client } = require("discord.js");
const client = new Client();

// Anti-Spam
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
    kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    muteMessage: '**{user_tag}** has been muted for spamming.',// Message that will be sent in chat upon muting a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    exemptPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
    muteRoleName: "Muted", // Name of the role that will be given to muted users!
    removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
    // And many more options... See the documentation.
});

// Run the bot
client.on('ready', () => {
    // Start the bot
    client.user.setActivity("Heavenisreal777 Studios server", { type: "WATCHING" });
    console.log(`${client.user.tag} has logged in.`);
});

// Log message
function log(author, message, type, channel) {
    console.log();
    if (channel != undefined) console.log(`CHANNEL: ${channel.name}`);
    if (type != undefined) console.log(`SENT BY: ${type}`);
    console.log(`[${author.tag}]: ${message}`);
}

// Get message
client.on('message', (message) => antiSpam.message(message));
client.on('message', message => {
    const hasPrefix = message.content.startsWith(PREFIX);
    const author = message.author;

    let msgType = 'UNDEFINED';
    if (!author.bot) msgType = 'USER'
    else msgType = 'BOT'

    if (hasPrefix) log(author, message.content, msgType, message.channel);
    else log(author, message.content, msgType, message.channel);
    if (author.bot) return;
    const channelID = '707001372788391977';
    const channel = client.channels.cache.get(channelID);

    if (hasPrefix) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        console.log('CMD: ' + CMD_NAME);
        console.log('args: ');
        console.log(args);

        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('You do not have permission to use that command.')
            if (args.length === 0)
                return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked.`))
                    .catch((err) => message.channel.send('I don\'t have permission to kick that user :('));
            } else {
                message.channel.send('That member was not found.');
            }
        } else if (CMD_NAME === 'ban') {
            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply('You do not have permission to use that command.')
            if (args.length === 0)
                return message.reply('Please provide an ID');

            message.guild.members.ban(args[0])
                .catch((err) => console.log(err))
        } else {
            message.reply('No such command exists.');
        }
    }

    // command string format
    // const args = message.content.slice(PREFIX.length).trim().split(' ');
    // if (!hasPrefix || author.bot) return;
    // if (command === 'avatar') {
    //     const user = message.author;

    //     return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
    // }
    // else if (command === 'say') {
    //     message.channel.send(`${args}`);
    //     if (!args.length) message.reply(`You didn't provide any arguments, ${author}!\n example: $say [your message]`);
    //     else channel.send(`${args}`);
    //     return;
    // }
    // else {
    //     if (command.length < 1) return;
    //     message.reply('That command doesn\'t exist :(');
    //     return;
    // }

});

// Log the bot in
client.login(token);
