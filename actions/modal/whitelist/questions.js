const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const pending_whitelist = require("../../button/whitelist/pending_whitelist");
const reject_whitelist = require("../../button/whitelist/reject_whitelist");
const config = require('../../../config/config');

module.exports = {
    id: 'whitelist_questions_submit_modal',
    async execute(interaction, client) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });       

        let embed = new EmbedBuilder()
            .setTitle('New Whitelist Application')
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
            .setThumbnail(interaction.user.avatarURL() || client.user.avatarURL())
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({ text: interaction.user.id, iconURL: interaction.user.avatarURL() }); // Do not change this line, it is used later in the code

        config.whitelist.questions.forEach(question => {
            embed.addFields({ name: question.question, value: `\`\`\`${interaction.fields.getTextInputValue(question.key)}\`\`\`` });
        });

        const guild = client.guilds.cache.get(interaction.guildId);
        const channel = guild.channels.cache.get(config.whitelist.channels.log);

        const approveButton = new ButtonBuilder()
            .setCustomId(pending_whitelist.id)
            .setLabel('Approve')
            .setStyle(ButtonStyle.Success);

        const denyButton = new ButtonBuilder()
            .setCustomId(reject_whitelist.id)
            .setLabel('Reject')
            .setStyle(ButtonStyle.Danger);

        const actionRow = new ActionRowBuilder().addComponents([approveButton, denyButton]);

        await channel.send({ embeds: [embed], components: [actionRow] });

        await interaction.editReply({ content: 'Application submitted successfully. Please wait for the confirmation', flags: MessageFlags.Ephemeral });
    }
};