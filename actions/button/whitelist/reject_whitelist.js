const { MessageFlags, userMention, EmbedBuilder } = require("discord.js");
const config = require("../../../config/config");

module.exports = {
    id: 'whitelist_application_reject_button',
    async execute(interaction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const interactionMessage = interaction.message;
        const userid = interactionMessage.embeds[0].footer.text;
        const guild = interaction.guild;
        const member = guild.members.cache.get(userid);

        const reject_whitelist_embed = new EmbedBuilder(interactionMessage.embeds[0])
            .setColor(parseInt(config.colors.rejected.replace("#", ""), 16));

        interactionMessage.edit({ embeds: [reject_whitelist_embed], components: [] });

        const rejectchannel = guild.channels.cache.get(config.whitelist.channels.rejected);
        if (!rejectchannel) return interaction.editReply({ content: `The rejected channel is not set up. Please contact the server administrator.` });

        const rejectEmbed = new EmbedBuilder()
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
                    value: `\`\`\`⌛ reject\`\`\``,
                    inline: true
                }
            ])
            .setImage(config.whitelist.banners.rejected)
            .setTimestamp()
            .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        const reject_add_roles = config.whitelist.roles.add.rejected;
        const reject_remove_roles = config.whitelist.roles.remove.rejected;

        for (const role of reject_add_roles) {
            await member.roles.add(role).catch(e => { });
        }
        for (const role of reject_remove_roles) {
            await member.roles.remove(role).catch(e => { });
        }

        try {
            rejectchannel.send({ content: userMention(user.id) + ' ' + config.whitelist.messages.rejected, embeds: [rejectEmbed] });
            await member.send({ content: userMention(user.id) + ' ' + config.whitelist.messages.rejected, embeds: [rejectEmbed] });
        } catch (error) {
            if (error.code === 50007) {
                return interaction.reply({ content: `The mentioned user has blocked their DMs. Don't worry, the role has been added.` });
            } else {
                return interaction.reply({ content: `An error occurred while processing your request.`, });
            }
        }

        return interaction.editReply({ content: `${userMention(member.user.id)}'s application has been successfully rejected.` });
    }
}