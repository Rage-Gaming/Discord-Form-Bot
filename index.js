require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const {updatePlayerCount} = require("./status")


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
  console.log(`Bot ${client.user.tag} is now online`);
  updatePlayerCount(client, process.env.SecondsToUpdateStatus)
  const commands = new SlashCommandBuilder()
    .setName("rage")
    .setDescription("this is a test command")

    .setName("setup")
    .setDescription("This command will send a message to the dedicated channel")

    .setName('acceptwl')
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('This will give whitelist role to mentioned user and automatically send whitelist message to channel')
        .addUserOption(option => option.setName('user').setDescription('Mention the user to give the whitelist').setRequired(true)))

  client.application.commands.create(commands)

  require("./whitelist")(client);
});


client.login(process.env.TOKEN);