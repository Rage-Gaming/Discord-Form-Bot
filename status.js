const axios = require('axios');
const { ActivityType } = require('discord.js');

const serverInfoUrl = `http://${process.env.serverIP}:${process.env.serverPort}/dynamic.json`;

module.exports = {
    updatePlayerCount: (client, seconds) => {
        let playerCount
        setInterval(function setStatus() {

            axios.get(serverInfoUrl)
                .then((response) => {
                    if (response.status === 200) {
                        const serverInfo = response.data;
                        if (serverInfo.clients !== undefined) {
                            playerCount = `${serverInfo.clients}/${serverInfo.sv_maxclients} Players`;
                            client.user.setActivity(`${playerCount}`, { type: ActivityType.Watching });
                        } else {
                            console.error('Player count not found in server info.');
                        }
                    } else {
                        console.error('Failed to retrieve server information. Status code:', response.status);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching server information:', error.message);
                });
            return setStatus;
        }(), seconds * 1000)
    }

}