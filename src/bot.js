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

    const parsed_msg = message.content.toLowerCase();

    if (hasPrefix) {
        const [CMD_NAME, ...args] = parsed_msg
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        console.log('CMD: ' + CMD_NAME);
        console.log('args: ');
        console.log(args);

        // all commands
        var COMMANDS = ['kick', 'ban', 'avatar', 'help'];

        // KICK
        if (CMD_NAME === COMMANDS[0]) 
        {
            if (!message.guild) return message.channel.send(`You can\'t use this command here.`);
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('you do not have permission to use that command.');
            if (args.length === 0)
                return message.reply('please provide an ID.');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .kick('Bad member!')
                    .then((member) => message.channel.send(`${member} was kicked.`))
                    .catch((err) => {
                        console.log(err);
                        message.channel.send('I don\'t have permission to kick that user.');
                    });
            } else {
                message.channel.send('That member was not found.');
            }

        }
        // BAN
        else if (CMD_NAME === COMMANDS[1])
        {
            if (!message.guild) return message.channel.send(`You can\'t use this command here.`);
            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply('you do not have permission to use that command.')
            if (args.length === 0)
                return message.reply('please provide an ID.');

            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .ban('Very bad member!')
                    .then((member) => message.channel.send(`${member} was banned.`))
                    .catch((err) => {
                        console.log(err);
                        message.channel.send('I don\'t have permission to ban that user.');
                    });
            } else {
                message.channel.send('That member was not found.');
            }

        }
        // AVATAR
        else if (CMD_NAME === COMMANDS[2]) {
            message.reply(message.author.displayAvatarURL());
        }
        // HELP
        else if (CMD_NAME === COMMANDS[3]) {
            message.reply('Here is the list of all commands: ');
            COMMANDS.forEach(function (Command) {
                message.channel.send("!"+Command);
            });
        }
        // UNKNOWN
        else {
            message.reply('no such command exists.');
        }
    // CHAT w USER
    } else {
        // return if user hasn't pinged bot
        if (!message.mentions.has(client.user.id)) return;

        // get parsed message
        const MESSAGE = parsed_msg;

        // all recievable messages
        var HELLO_1a = ['hi', 'hey', 'hello', 'heya', 'good morning', 'good afternoon', 'good evening', 'morning!'];
        var BYE_1a = ['bye', 'see ya', 'see you', 'see you next time'];

        var SENTENCE_TYPE = null;

        // GREETING
        HELLO_1a.forEach(function (Word) {``
            if (MESSAGE.includes(Word)) SENTENCE_TYPE = "greeting";
        });
        // GOODBYE
        BYE_1a.forEach(function (Word) {
            if (MESSAGE.includes(Word)) SENTENCE_TYPE = "goodbye";
        });

        // all repliable messages
        var HELLO_2a = ['hi!', 'hey!', 'hello!', 'heya!', 'have we met before?'];
        var BYE_2a = ['bye!', 'see ya!', 'see you!', 'see you next time!', 'I\'ll be waiting!', 'you can send me messages any time ;)', 'I\'ll be here if you need me.'];

        // choose some random sentence from array to reply with
        if (SENTENCE_TYPE === 'greeting') {
            var REPLY = HELLO_2a[Math.floor(Math.random() * HELLO_2a.length)];
        }
        else if (SENTENCE_TYPE === 'goodbye') {
            var REPLY = BYE_2a[Math.floor(Math.random() * BYE_2a.length)];
        }
        // cancel reply to user
        else REPLY = 'hey there! Do you need help with anything?';

        // reply to user
        message.reply(REPLY);
    }
});

// Log the bot in
client.login(token);
