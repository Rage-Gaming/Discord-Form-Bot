const { Events, MessageFlags } = require('discord.js');
const fs = require('fs');
const path = require('path');

const loadModals = (dir) => {
    const modals = {};
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            Object.assign(modals, loadModals(filePath));
        } else if (file.endsWith('.js')) {
            const modal = require(filePath);
            modals[modal.id] = modal;
        }
    }

    return modals;
};

if (!fs.existsSync(path.join(__dirname, '../actions/modal'))) fs.mkdirSync(path.join(__dirname, '../actions/modal'), { recursive: true });
const modals = loadModals(path.join(__dirname, '../actions/modal'));

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isModalSubmit()) return;
        try {
            if (modals[interaction.customId]) {
                await modals[interaction.customId].execute(interaction, client);
            } else {
                console.error(`Modal ${interaction.customId} not found.`);
                await interaction.reply({ content: 'Modal not found!', flags: MessageFlags.Ephemeral });
            }
        } catch (error) {
            console.error(`Error executing modal ${interaction.customId}: ${error}`);
            await interaction.reply({
                content: 'There was an error while executing this modal!',
                flags: MessageFlags.Ephemeral,
            });
        }
    },
};