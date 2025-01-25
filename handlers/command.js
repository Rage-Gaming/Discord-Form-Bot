const { Events, MessageFlags, PermissionsBitField } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return console.error(`Command ${interaction.commandName} not found.`);

        try {
            const admin = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)
            if (command.admin && !admin) {
                await interaction.reply({ content: `This command is only available to administrators.`, flags: MessageFlags.Ephemeral });
                return;
            }

            await command.execute(interaction, client);
        } catch (error) {
            console.error(`Error executing command ${command.data.name}: ${error}`);
            await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
    },
};
