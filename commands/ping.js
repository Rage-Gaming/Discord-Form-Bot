const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { formatUptime } = require("../utils/formatUptime");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with bot stats'),
    global: true,
    async execute(interaction, client) {
        const ping = client.ws.ping;
        const uptime = formatUptime(client.uptime);
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        const numServers = client.guilds.cache.size;
        const numUsers = client.users.cache.size;
        const apiLatency = client.ws.ping;
        const discordJSVersion = require('discord.js').version;
        const nodeVersion = process.version;
        const version = require('../package.json').version;

        const devbtn = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Developer')
            .setEmoji('👨‍💻')
            .setURL('https://github.com/ipuppyyt');

        const btnrow = new ActionRowBuilder().addComponents(devbtn);
        const pingembed = new EmbedBuilder()
            .setColor(parseInt('D70040', 16))
            .setAuthor({ name: `${client.user.username} Stats`, iconURL: client.user.avatarURL() })
            .addFields(
                { name: ':ping_pong: Ping', value: `┕ ${ping} ms`, inline: true },
                { name: ':clock1: Uptime', value: '┕ ' + uptime, inline: true },
                { name: ':file_cabinet: Memory', value: `┕ ${Math.round(memoryUsage * 100) / 100} MB`, inline: true },
                { name: ':desktop: Servers', value: `┕ ${numServers}`, inline: true },
                { name: ':busts_in_silhouette: Users', value: `┕ ${numUsers}`, inline: true },
                { name: ':satellite: API Latency', value: `┕ ${apiLatency} ms`, inline: true },
                { name: ':robot: Version', value: `┕ v${version}`, inline: true },
                { name: ':blue_book: Discord.js', value: `┕ v${discordJSVersion}`, inline: true },
                { name: ':green_book: Node.js', value: `┕ ${nodeVersion}`, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() });

        interaction.reply({ embeds: [pingembed], components: [btnrow] }).catch(console.error);
    },
};
