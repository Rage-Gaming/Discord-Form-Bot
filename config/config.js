const { TextInputStyle, ActivityType } = require('discord.js');
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
        pending: "#FFA500", // Pending Color
        accepted: "#00d0ff", // Accepted Color
        rejected: "#FF0000", // Rejected Color
    },
    whitelist: {
        log_channel: "1116787141872197692", // Channel ID where the bot will send whitelist applications
        modal_title: "Whitelist Application", // Title of the Modal
        questions: [  // Do not keep more than 5 questions as Discord does not allow more than 5 inputs in a modal
            {
                question: "What is your Discord Username?", // Question
                placeholder: "Enter your Discord Username", // Placeholder for the input
                key: "username", // Key to store the answer[Need to be unique for each question]
                type: TextInputStyle.Short, // Type of the input [Short, Paragraph]
                required: true // Required or not
            },
            {
                question: "What is your Discord ID?", // Question
                placeholder: "Enter your Discord ID", // Placeholder for the input
                key: "id", // Key to store the answer[Need to be unique for each question]
                type: TextInputStyle.Short, // Type of the input [Short, Paragraph]
                required: true // Required or not
            },
            {
                question: "What is your Minecraft Username?", // Question
                placeholder: "Enter your Minecraft Username", // Placeholder for the input
                key: "mc_username", // Key to store the answer[Need to be unique for each question]
                type: TextInputStyle.Short, // Type of the input [Short, Paragraph]
                required: true
            },
            {
                question: "What is your age?", // Question
                placeholder: "Enter your age", // Placeholder for the input
                key: "age", // Key to store the answer[Need to be unique for each question]
                type: TextInputStyle.Short, // Type of the input [Short, Paragraph]
                required: true // Required or not
            },
            {
                question: "How did you find us?", // Question
                placeholder: "Enter how you found us", // Placeholder for the input
                key: "found", // Key to store the answer[Need to be unique for each question]
                type: TextInputStyle.Paragraph, // Type of the input [Short, Paragraph]
                required: true // Required or not
            }
        ],
        channels: {
            log: "969659298261110916", // Channel ID where the bot will send form submissions
            pending: "", // Channel ID where the bot will send pending whitelist applications
            accepted: "", // Channel ID where the bot will send form acceptances
            rejected: "", // Channel ID where the bot will send form rejections
        },
        roles: {
            managers: [""], // Whitelist Managers' Role ID, add more separated by commas eg: ["", ""]
            add: {
                pending: [""], // Roles to be added to pending whitelist applications, add more separated by commas. eg: ["", ""]
                accepted: [""], // Roles to be added to accepted whitelist applications, add more separated by commas. eg: ["", ""]
                rejected: [""], // Roles to be added to rejected whitelist applications, add more separated by commas. eg: ["", ""]
            },
            remove: {
                pending: [""], // Roles to be removed from pending whitelist applications, add more separated by commas. eg: ["", ""]
                accepted: [""], // Roles to be removed from accepted whitelist applications, add more separated by commas. eg: ["", ""]
                rejected: [""], // Roles to be removed from rejected whitelist applications, add more separated by commas. eg: ["", ""]
            }
        },
        banners: {
            pending: "https://ik.imagekit.io/yg4xrysan/RageGaming/Dhruvam/BOT/34Untitled-1_MdzWv8Q4U.webp", // Pending Banner
            accepted: "https://ik.imagekit.io/yg4xrysan/RageGaming/Dhruvam/BOT/34Untitled-1_MdzWv8Q4U.webp", // accepted Banner
            rejected: "https://ik.imagekit.io/yg4xrysan/RageGaming/Dhruvam/BOT/34Untitled-1_MdzWv8Q4U.webp", // rejected Banner
        },
        messages: {
            pending: "Your whitelist application has been added to the queue.", // Pending Message
            accepted: "Your whitelist application has been accepted.", // Accepted Message
            rejected: "Your whitelist application has been rejected.", // Rejected Message
        },
    },
    activity: {
        fivem: {
            enabled: true, // Enable/Disable FiveM Player Count
            ip: process.env.SERVER_IP, // Your FiveM Server IP
            port: process.env.SERVER_PORT, // Your FiveM Server Port
            interval: 30, // Interval in seconds to update the player count
        },
        discord: {
            enabled: true, // Enable/Disable Discord Activity
            status: "online", // Bot Status [online, idle, dnd, invisible]
            type: ActivityType.Custom, // Activity Type [PLAYING, STREAMING, LISTENING, WATCHING]
            text: "Hi, I'm a bot!", // Activity Text
        },
    }
};