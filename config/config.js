require('dotenv').config();

module.exports = {
    token: process.env.DISCORD_TOKEN, // Your Discord Bot's Token(add it to your .env file)
    client: {
        id: process.env.CLIENT_ID, // Your Discord Bot's Client ID(add it to your .env file)
        secret: process.env.CLIENT_SECRET, // Your Discord Bot's Client Secret(add it to your .env file)
    },
    guild: "766938077733060628", // Discord Server ID where the bot will work
    colors: {
        theme: "#FF0000", // Your Discord Bot's Theme Color
        success: "#00d0ff", // Success Color
        failure: "#FF0000", // Failure Color
    },
    whitelist: {
        log_channel: "1116787141872197692", // Channel ID where the bot will send whitelist applications
        channels: {
            log: "", // Channel ID where the bot will send form submissions
            success: "", // Channel ID where the bot will send form acceptances
            reject: "", // Channel ID where the bot will send form rejections
        },
        roles: {
            managers: [""], // Whitelist Managers' Role ID, add more separated by commas eg: ["", ""]
            add: {
                accepted: [""], // Roles to be added to accepted whitelist applications, add more separated by commas. eg: ["", ""]
                rejected: [""], // Roles to be added to rejected whitelist applications, add more separated by commas. eg: ["", ""]
            },
            remove: {
                accepted: [""], // Roles to be removed from accepted whitelist applications, add more separated by commas. eg: ["", ""]
                rejected: [""], // Roles to be removed from rejected whitelist applications, add more separated by commas. eg: ["", ""]
            }
        },
        banners: {
            success: "https://ik.imagekit.io/yg4xrysan/RageGaming/Dhruvam/BOT/34Untitled-1_MdzWv8Q4U.webp", // Success Banner
            failure: "https://ik.imagekit.io/yg4xrysan/RageGaming/Dhruvam/BOT/34Untitled-1_MdzWv8Q4U.webp", // Failure Banner
        },
        messages: {
            success: "Your whitelist application has been accepted.", // Success Message
            failure: "Your whitelist application has been rejected.", // Failure Message
        },
    }
};