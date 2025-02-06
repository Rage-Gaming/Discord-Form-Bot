const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config/config');
const path = require('path');
const fs = require('fs');
require('colors');

console.clear();
console.log("Do enable the intents in the Discord Developer Portal.".yellow);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
if (!fs.existsSync(commandsPath)) fs.mkdirSync(commandsPath, { recursive: true });
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if (command.command === false) continue;
  if (command.data && command.execute) { client.commands.set(command.data.name, command) }
  else { console.error(`The command at ${filePath} is missing a required "data" or "execute" property.`.red) }
}

// Load events
const eventsPath = path.join(__dirname, 'events');
if (!fs.existsSync(eventsPath)) fs.mkdirSync(eventsPath, { recursive: true });
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) { client.once(event.name, (...args) => event.execute(...args, client)) }
  else { client.on(event.name, (...args) => event.execute(...args, client)) }
}

// Load handlers
const handlersPath = path.join(__dirname, 'handlers');
if (!fs.existsSync(handlersPath)) fs.mkdirSync(handlersPath, { recursive: true });
const handlerFiles = fs.readdirSync(handlersPath).filter(file => file.endsWith('.js'));
for (const file of handlerFiles) {
  const filePath = path.join(handlersPath, file);
  const handler = require(filePath);
  if (handler.name && handler.execute) { client.on(handler.name, (...args) => handler.execute(...args, client)) }
  else { console.error(`The handler at ${filePath} is missing a required "name" or "execute" property.`.red) }
}

// Add error handling
client.on('error', error => console.error(`[ERROR] `.bgRed.black, error));
client.on('unhandledRejection', error => console.error(`[UNHANDLED] `.bgMagenta.black, error));
client.on('warn', warning => console.warn(`[WARN] `.bgYellow.black, warning));

if (config.token) client.login(config.token)
else { console.error('No token provided.'.red); process.exit(0); }