const { SlashCommandBuilder, EmbedBuilder, MessageFlags, userMention } = require("discord.js");
const config = require("../config/config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('acceptwl')
        .setDescription('Accept a whitelist application')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to accept the whitelist application for')
                .setRequired(true)),
    global: true,
    async execute(interaction, client) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const managerroles = config.whitelist.roles.managers;
        const hasRole = interaction.member.roles.cache.some(role => managerroles.includes(role.id));
        if (!hasRole) return interaction.editReply({ content: 'You do not have permission to use this command.' });

        const user = interaction.options.getUser('user');
        const accept_msg_channel = interaction.guild.channels.cache.get(config.whitelist.channels.success);

        const acceptEmbed = new EmbedBuilder()
            .setColor(parseInt(config.colors.success.replace('#', ''), 16))
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setImage(config.banners.success)
            .addFields([
                {
                    name: '\n\u200b\nServer Name ',
                    value: `\`\`\`${interaction.guild.name}\`\`\``,
                    inline: false
                },
                {
                    name: '\n\u200b\nWhitelist Status',
                    value: `\`\`\`✅ WHITELISTED\`\`\``,
                    inline: true
                },
            ])
            .setTimestamp()
            .setFooter({ text: `${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        const accept_add_roles = config.whitelist.roles.add.accepted;
        const accept_remove_roles = config.whitelist.roles.remove.accepted;

        for (const role of accept_add_roles) {
            await user.roles.add(role).catch(e => { });
        }
        for (const role of accept_remove_roles) {
            await user.roles.remove(role).catch(e => { });
        }

        try {
            await accept_msg_channel.send({ content: userMention(user.id) + ' ' + config.whitelist.messages.success, embeds: [acceptEmbed] });
            await user.send({ content: userMention(user.id) + ' ' + config.whitelist.messages.success, embeds: [acceptEmbed] });
            return interaction.editReply({ content: `${userMention(user.id)} has been successfully whitelisted.` });
        } catch (error) {
            if (error.code === 50007) {
                return interaction.editReply({ content: `The mentioned user has blocked their DMs. Don't worry, the role has been added.` });
            } else {
                return interaction.editReply({ content: `An error occurred while processing your request.` });
            }
        }
    },
};
