const { Channel } = require("discord.js");


module.exports = client => {
    console.log("WELCOME: RUN");
    const channellID = "707012456223998023";
    client.on('guildMemberAdd', (member) => {
        console.log(member);
        var welcomes =
            [
                `Welcome friend, ${member}`,
                `Welcome aboard, ${member}`,
                `Hello, ${member}!`,
                `Welcome ${member}, everyone!`,
                `Welcome to the family, ${member}!`,
                `Haii <:haii:826746540487213088>, ${member}!`,
            ];

        // Send the message to a designated channel on a server:
        const channel = member.guild.channels.cache.find(ch => ch.name === '💻general');
        // Do nothing if the channel wasn't found on this server
        if (!channel) return;
        // Send the message, mentioning the member
        for (let i = 0; i < 1; i++) {
            var REPLY = welcomes[Math.floor(Math.random() * welcomes.length)];
            channel.send(REPLY);
        }
    });
}