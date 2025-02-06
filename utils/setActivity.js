const axios = require('axios');
const config = require('../config/config');
const { ActivityType } = require('discord.js');
require('colors');

const serverInfoUrl = `http://${config.activity.fivem.ip}:${config.activity.fivem.port}/dynamic.json`;

updatePlayerCount = (client, seconds) => {
    let playerCount;
    let retryCount = 0;
    const maxRetries = 5;

    const setStatus = () => {
        if (retryCount >= maxRetries) {
            console.error('Max retries reached. Stopping attempts to fetch server information.'.red);
            return;
        }

        axios.get(serverInfoUrl)
            .then((response) => {
                if (response.status === 200) {
                    const serverInfo = response.data;
                    if (serverInfo.clients !== undefined) {
                        playerCount = `${serverInfo.clients}/${serverInfo.sv_maxclients} Players`;
                        client.user.setActivity(`${playerCount}`, { type: ActivityType.Watching });
                        retryCount = 0; // Reset retry count on success
                    } else {
                        console.error('Player count not found in server info.');
                    }
                } else {
                    console.error('Failed to retrieve server information. Status code:', response.status);
                    retryCount++;
                }
            })
            .catch((error) => {
                console.log(`The system is trying to fetch ${process.env.serverIP}:${process.env.serverPort}, but can't reach the destination. Please change the STATUS value in the .env file to false if you don't want to use the status.`.red);
                console.error('Error fetching server information:'.red, error.message.red);
                retryCount++;
            });
    };

    setInterval(setStatus, seconds * 1000);
};

module.exports = {
    updatePlayerCount
} 