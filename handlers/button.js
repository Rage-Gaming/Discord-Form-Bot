const { Events, MessageFlags } = require('discord.js');
const fs = require('fs');
const path = require('path');

const loadButtons = (dir) => {
    const buttons = {};
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            Object.assign(buttons, loadButtons(filePath));
        } else if (file.endsWith('.js')) {
            const button = require(filePath);
            buttons[button.id] = button;
        }
    }

    return buttons;
};


if (!fs.existsSync(path.join(__dirname, '../actions/button'))) fs.mkdirSync(path.join(__dirname, '../actions/button'), { recursive: true });
const buttons = loadButtons(path.join(__dirname, '../actions/button'));

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isButton()) return;
        try {
            if (buttons[interaction.customId]) {
                await buttons[interaction.customId].execute(interaction, client);
            } else {
                console.error(`Button ${interaction.customId} not found.`);
                await interaction.reply({ content: 'Button not found!', flags: MessageFlags.Ephemeral });
            }
        } catch (error) {
            console.error(`Error executing button ${interaction.customId}: ${error}`);
            await interaction.reply({ content: 'There was an error while executing this button!', flags: MessageFlags.Ephemeral });
        }
    },
};