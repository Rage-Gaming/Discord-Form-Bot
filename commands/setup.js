const { SlashCommandBuilder, ChannelType, MessageFlags } = require("discord.js");
const whitelistSetup = require("./setup/whitelist");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Setup commands for the bot.")
        .addSubcommand(command => command.setName('whitelist')
            .setDescription('Command to setup whitelist system.')
            .addStringOption(option => option.setName('embedtitle')
                .setDescription('Title for the embed.')
                .setRequired(true))
            .addStringOption(option => option.setName('embeddescription')
                .setDescription('Description for the embed.')
                .setRequired(true))
            .addStringOption(option => option.setName('embedcolor')
                .setDescription('Color for the embed.')
                .setRequired(true))
            .addAttachmentOption(option => option.setName('imageurl')
                .setDescription('Image URL for the embed.')
                .setRequired(true))),

    dev: true,
    async execute(interaction) {
        const { options } = interaction;
        const sub = options.getSubcommand();

        switch (sub) {
            case 'whitelist':
                await interaction.reply({ content: "⏳ Setting up whitelist embed...", flags: MessageFlags.Ephemeral });
                await whitelistSetup.execute(interaction, options);
                break;

        }
    }
}