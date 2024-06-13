# Discord-Form-Bot

This is a Discord form bot. Server members can fill out the form and submit it to the admins.

You need to rename `example.env.txt` to `.env`.

You need to import your Discord bot token into the `.env` file and add the necessary items.

After reaching the admin, they can react from there. For example, they can accept or reject the request, and the reaction will be sent to the mentioned channel and the user's DM.

Some previews:

<img src = "images/Screenshot_20230406-113644_Discord.png">

<img src = "images/Screenshot_20230406-113719_Discord.png">

<img src = "images/image.png">



To start the app use:
    node start.js

To view the list of running processes:
    pm2 list

To restart your application:
    pm2 restart  bot

To stop your application:
    pm2 stop bot
To monitor logs:
    pm2 logs bot

To setup
    Use /setup for the intitial setup



If you have any doubts about this bot, you can contact me via Discord. `chaos_rage`
