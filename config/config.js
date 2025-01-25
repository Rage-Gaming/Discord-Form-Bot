require('dotenv').config();

module.exports = {
    token: process.env.DISCORD_TOKEN, // Your Discord Bot's Token(add it to your .env file)
    client: {
        id: process.env.CLIENT_ID, // Your Discord Bot's Client ID(add it to your .env file)
        secret: process.env.CLIENT_SECRET, // Your Discord Bot's Client Secret(add it to your .env file)
    },
    whitelist: {
        guild: "", // Discord Server ID where the bot will work
        manager: {
            roles: [""], // Roles that can whitelist the user. Add more roles separated by commas
        }
    }
};