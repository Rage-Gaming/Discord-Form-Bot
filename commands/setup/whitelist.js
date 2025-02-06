const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags } = require("discord.js");
const open_questions = require("../../actions/button/whitelist/open_questions");

const whitelistSetup = async (interaction, options) => {
    console.log("Whitelist setup started.");
    const embedtitle = options.getString('embedtitle');
    const embeddescription = options.getString('embeddescription');
    const embedcolor = options.getString('embedcolor');
    const imageurl = options.getAttachment('imageurl');

    const embed = new EmbedBuilder()
        .setTitle(embedtitle)
        .setDescription(embeddescription)
        .setColor(parseInt(embedcolor.replace("#", ""), 16))
        .setImage(imageurl ? imageurl.url : null);

    const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId(open_questions.id)
        .setLabel("Apply Whitelist")
        .setEmoji("🎫");

    const actionRow = new ActionRowBuilder().addComponents(button);

    await interaction.channel.send({ embeds: [embed], components: [actionRow] });

    await interaction.editReply({ content: `✅ Whitelist setup completed.`, flags: MessageFlags.Ephemeral });
}

module.exports = {
    command: false,
    execute: whitelistSetup
}