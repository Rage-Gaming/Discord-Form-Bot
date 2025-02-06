const { Routes, ActivityType } = require('discord-api-types/v10');
const loadCommands = require('../utils/loadCommands');
const { REST } = require('@discordjs/rest');
const config = require('../config/config');
const { Events } = require('discord.js');
const path = require('path');
require('colors');

module.exports = {
    name: Events.GuildCreate,
    async execute(client, guild) {
        const rest = new REST({ version: '10' }).setToken(config.token);

        const commandsPath = path.join(__dirname, '../commands');
        const { guildCommands } = loadCommands(commandsPath, client);

        try {
            try {
                await rest.put(Routes.applicationGuildCommands(config.client.id, guild.id), { body: guildCommands });
                console.log(`Registered guild (/) commands for guild ${guild.name} ✔`.green);
            } catch (error) {
                console.error(`Error registering commands for guild ${guild.name}:`.red, error);
            }
        } catch (error) {
            console.error('Error registering commands:', error.message.red);
        }
    },
};