const {
    Client,
    ActivityType,
    ButtonBuilder,
    ButtonStyle,
    GatewayIntentBits,
    MessageActionRow,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
    REST,
    Routes,
    discord,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    PermissionsBitField,
    Partials,
} = require('discord.js');
const fs = require("fs");
const axios = require('axios');
const info = require('./config.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
    ],
    partials: [Partials.GuildMember],
});
client.login(info.token).catch(error => console.log(`
    You forgot to write a [token]`))
client.once("ready", () => {
    console.log("Bot is Ready!");
    console.log("Code by Abo876");
    console.log(`Logged in as: ${client.user.tag}`);
    console.log(`-> Servers / Members: ${client.guilds.cache.size} server / ${client.users.cache.size} member`);
});
client.on('messageCreate', async message => {
    const mcstring = [`mc`, `ip`]
    if (mcstring.some(string => message.content.toLowerCase().startsWith(string))) {

        try {
            const responsej = await axios.get(`https://api.mcstatus.io/v2/status/java/${info.ip}:${info.port}`);
            const responseb = await axios.get(`https://api.mcstatus.io/v2/status/Bedrock/${info.ip}:${info.bedrock_port}`);
            const hostname = responsej.data.hostname
            const portb = responseb.data.port
            const portj = responsej.data.port

            if (responsej.data.online == false || responseb.data.online == false) {
                const embed = new EmbedBuilder()
                    .setTitle(` ** <a:offline:1269055869086072853> | Server is Offline ** `)
                    .addFields({
                        name: '<:java:1307494301877403709> Java',
                        value: `**Java Status: Offline <a:offline:1269055869086072853> \n Ip: ${hostname} \n Port: ${portj}**`,
                        inline: true
                    }, {
                        name: `<:bedrock:1307494448548020325> Bedrock`,
                        value: `**Bedrock Status: Offline <a:offline:1269055869086072853> \n Ip: ${hostname} \n Port: ${portb}**`,
                        inline: true
                    })
                    .setTimestamp()
                    .setColor(0xB22222)

                message.channel.send({
                    embeds: [embed]
                })
            } else if (responsej.data.online == true || responseb.data.online == false) {
                const embed2 = new EmbedBuilder()
                    .setTitle(` ** <a:onlineGif:1269055866737262806> | Server is Online ** `)
                    .addFields({
                        name: '<:java:1307494301877403709> Java',
                        value: `**Java Status: Online <a:onlineGif:1269055866737262806> \n Ip: ${hostname} \n Port: ${portj} \n Version: ${responsej.data.version.name_raw} \n Players: ${responsej.data.players.online}/${responsej.data.players.max}**`,
                        inline: true
                    }, {
                        name: `<:bedrock:1307494448548020325> Bedrock`,
                        value: `**Bedrock Status: Offline <a:offline:1269055869086072853> \n this server is not support Bedrock**`,
                        inline: true
                    })
                    .setTimestamp()
                    .setColor(0xB22222)

                message.channel.send({
                    embeds: [embed2]
                })
            } else if (responsej.data.online == false || responseb.data.online == true) {
                const embed3 = new EmbedBuilder()
                    .setTitle(` ** <a:onlineGif:1269055866737262806> | Server is Online ** `)
                    .addFields({
                        name: '<:java:1307494301877403709> Java',
                        value: `**Java Status: Offline <a:offline:1269055869086072853> \n this server is not support Java**`,
                        inline: true
                    }, {
                        name: `<:bedrock:1307494448548020325> Bedrock`,
                        value: `**Bedrock Status: Online <a:onlineGif:1269055866737262806> \n Ip: ${hostname} \n Port: ${portb} \n Version: ${responseb.data.version.name} \n Players: ${responseb.data.players.online}/${responseb.data.players.max}**`,
                        inline: true
                    })
                    .setTimestamp()
                    .setColor(0xB22222)

                message.channel.send({
                    embeds: [embed3]
                })
            } else if (responsej.data.online == true || responseb.data.online == true) {
                const embed4 = new EmbedBuilder()
                    .setTitle(` ** <a:onlineGif:1269055866737262806> | Server is Online ** `)
                    .addFields({
                        name: '<:java:1307494301877403709> Java',
                        value: `**Java Status: Online <a:onlineGif:1269055866737262806> \n Ip: ${hostname} \n Port: ${portj} \n Version: ${responsej.data.version.name_raw} \n Players: ${responsej.data.players.online}/${responsej.data.players.max}**`,
                        inline: true
                    }, {
                        name: `<:bedrock:1307494448548020325> Bedrock`,
                        value: `**Bedrock Status: Online <a:onlineGif:1269055866737262806> \n Ip: ${hostname} \n Port: ${portb} \n Version: ${responseb.data.version.name} \n Players: ${responseb.data.players.online}/${responseb.data.players.max}**`,
                        inline: true
                    })
                    .setTimestamp()
                    .setColor(0xB22222)

                message.channel.send({
                    embeds: [embed4]
                })
            }
        } catch (error) {
            console.error('erorr', error);
            message.channel.send('Unable to connect to the Minecraft server.');
        }
    }
});