const { MessageFlags, EmbedBuilder, userMention } = require("discord.js");
const config = require("../../../config/config");

module.exports = {
    id: 'whitelist_application_pending_button',
    async execute(interaction, client) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const interactionMessage = interaction.message;
        const userid = interactionMessage.embeds[0].footer.text;
        const guild = interaction.guild;
        const member = guild.members.cache.get(userid);

        const pending_whitelist_embed = new EmbedBuilder(interactionMessage.embeds[0])
            .setColor(parseInt(config.colors.pending.replace("#", ""), 16));

        interactionMessage.edit({ embeds: [pending_whitelist_embed], components: [] });

        const pendingchannel = guild.channels.cache.get(config.whitelist.channels.pending);
        if (!pendingchannel) return interaction.editReply({ content: `The pending channel is not set up. Please contact the server administrator.` });

        const pendingEmbed = new EmbedBuilder()
            .setColor("Yellow")
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addFields([
                {
                    name: '\n\u200b\nServer Name ',
                    value: `\`\`\`${guild.name}\`\`\``,
                    inline: false
                },
                {
                    name: '\n\u200b\nWhitelist Status',
                    value: `\`\`\`⌛ Pending\`\`\``,
                    inline: true
                }
            ])
            .setImage(config.whitelist.banners.pending)
            .setTimestamp()
            .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        const pending_add_roles = config.whitelist.roles.add.pending;
        const pending_remove_roles = config.whitelist.roles.remove.pending;

        for (const role of pending_add_roles) {
            await member.roles.add(role).catch(e => { });
        }
        for (const role of pending_remove_roles) {
            await member.roles.remove(role).catch(e => { });
        }

        try {
            pendingchannel.send({ content: userMention(user.id) + ' ' + config.whitelist.messages.pending, embeds: [pendingEmbed] });
            member.send({ content: userMention(user.id) + ' ' + config.whitelist.messages.pending, embeds: [pendingEmbed] });
        } catch (error) {
            if (error.code === 50007) {
                return interaction.editReply({ content: `The mentioned user has blocked their DMs. Don't worry, the role has been added.` });
            } else {
                console.error(error);
                return interaction.editReply({ content: `An error occurred while processing your request.`, });
            }
        }

        return interaction.editReply({ content: `${userMention(member.user.id)}'s application has been successfully pendinged.` });
    }
}