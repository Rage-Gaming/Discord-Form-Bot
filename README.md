# Discord Form Bot

This is a Discord form bot that allows server members to fill out forms and submit them to the admins. Admins can then react to the submissions, either accepting or rejecting the requests. The reactions will be sent to a specified channel and the user's DM.

## Getting Started

### Prerequisites

- Node.js
- PM2 (Process Manager)

### Installation

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Rename the example environment file**:
    ```bash
    mv example.env.txt .env
    ```

3. **Add your Discord bot token and other necessary items to the `.env` file**:
    ```env
    DISCORD_TOKEN=your_discord_bot_token
    ADMIN_CHANNEL_ID=your_admin_channel_id
    GUILD_ID=your_guild_id
    ```

4. **Install the dependencies**:
    ```bash
    npm install
    ```

### Starting the Bot

To start the bot, run the following command:
```bash
node start.js
