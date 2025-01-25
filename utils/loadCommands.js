const path = require('path');
const fs = require('fs');

const loadCommands = (dir, client) => {
    const globalCommands = [];
    const guildCommands = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const { globalCommands: subGlobal, guildCommands: subGuild } = loadCommands(filePath);
            globalCommands.push(...subGlobal);
            guildCommands.push(...subGuild);
        } else if (file.endsWith('.js')) {
            try {
                const command = require(filePath);
                if (command.command === false) continue;
                if (command.data && command.data.name) {
                    console.log(`Loaded (/) ${command.data.name} ✔`.magenta);
                    client.commands.set(command.data.name, command);
                    if (command.global) {
                        globalCommands.push(command.data.toJSON());
                    } else {
                        guildCommands.push(command.data.toJSON());
                    }
                } else {
                    console.error(`Invalid command file: ${file}`.red);
                }
            } catch (error) {
                console.error(`Error loading command file ${file}:`.red, error);
            }
        }
    }

    return { globalCommands, guildCommands };
};

module.exports = loadCommands;