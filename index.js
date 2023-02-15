const { Client, Constants } = require("discord.js");
const settings = require("./config");

const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "DIRECT_MESSAGES"],
});
client.on("ready", async () => {
  console.log(`online ${client.user.tag}`);
  let guild = client.guilds.cache.get(settings.guildID);
  if (guild) {
    await guild.commands.set([
      {
        name: "setup",
        description: `setup application system in your server`,
        type: "CHAT_INPUT",
      },
      {
        name: "ping",
        description: `get ping of bot`,
        type: "CHAT_INPUT",
      },
      {
        name: "acceptwl",
        description: `To accept player whitelist easily`,
        options: [{
          name: "member",
          description: "The member you want to whitelist",
          required: true,
          type: Constants.ApplicationCommandOptionTypes.USER,
        }]
      },
      {
        name: "rejectwl",
        description: `To reject player whitelist easily`,
        type: "CHAT_INPUT",
      },
      {
        name: "pendingwl",
        description: `To change player whitelist to pending easily`,
        type: "CHAT_INPUT",
      },
    ]);
  }
  require("./application_manager")(client, settings);
});

client.login(settings.token);