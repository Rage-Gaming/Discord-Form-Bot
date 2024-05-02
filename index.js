require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { Client, GatewayIntentBits } = require("discord.js");
const { updatePlayerCount } = require("./status");
const commands = require("./commands");
require('colors');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

client.on("ready", async () => {
  console.clear();
  console.log(`Bot ${client.user.tag} is now online`.green);
  updatePlayerCount(client, process.env.SecondsToUpdateStatus);
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  (async () => {
    try {
      await rest.put(
        Routes.applicationGuildCommands(
          process.env.ClientID,
          process.env.GuildID
        ),
        { body: commands }
      );
      console.log(`Registered Guild Commands.`.green);
    } catch (error) {
      console.error(error);
    }
  })();

  require("./whitelist")(client);
});

client.login(process.env.TOKEN);
