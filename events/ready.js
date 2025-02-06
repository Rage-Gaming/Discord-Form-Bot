const { Routes } = require('discord-api-types/v10');
const setActivity = require('../utils/setActivity');
const loadCommands = require('../utils/loadCommands');
const { REST } = require('@discordjs/rest');
const config = require('../config/config');
const { Events } = require('discord.js');
const path = require('path');
require('colors');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.clear();
        console.log(`Logged in as ${client.user.username}`.yellow);
        console.log('Refreshing slash (/) commands'.blue);
        const rest = new REST({ version: '10' }).setToken(config.token);

        const commandsPath = path.join(__dirname, '../commands');
        const { globalCommands, guildCommands } = loadCommands(commandsPath, client);

        try {
            await rest.put(Routes.applicationCommands(config.client.id), { body: globalCommands });
            console.log('Registered global (/) commands ✔'.green);
            const guilds = await client.guilds.fetch();
            for (const guild of guilds.values()) {
                try {
                    await rest.put(Routes.applicationGuildCommands(config.client.id, guild.id), { body: guildCommands });
                    console.log(`Registered guild: ${guild.name} ✔`.green);
                } catch (error) {
                    console.error(`Error registering commands for guild ${guild.name}:`.red, error);
                }
            }
            console.log('Registered guild (/) commands ✔'.green);
        } catch (error) {
            console.error('Error registering commands:', error.message.red);
        }

        if((config.activity.discord.enabled && config.activity.fivem.enabled) || config.activity.fivem.enabled) {
            setActivity.updatePlayerCount(client, config.activity.fivem.interval);
        } else {
            client.user.setPresence({
                status: config.activity.discord.status,
                activities: [{ name: config.activity.discord.text, type: config.activity.discord.type }]
            });
        }
    },
};