# Discord Voice Channel Bot/Account Host

This project allows you to host multiple Discord bots or user accounts, enabling them to join and stay in voice channels across many Discord servers simultaneously. It is designed for use on RDPs (Remote Desktop Protocol servers) or VPSs (Virtual Private Servers), making it ideal for persistent hosting.

## Features

- Host multiple Discord bots or accounts in voice channels at once.
- Easily configure which channels to join.
- Supports both user tokens and bot tokens.
- Simple setup for Windows or Linux servers.
- Optional process management with [PM2](https://pm2.keymetrics.io/) for production use.

## How It Works

The code uses the Discord.js library to log in with your token and join the specified voice channels. You provide your Discord account or bot token in a `.env` file, and list the target voice channel IDs in an array inside `run.js`. The script connects to Discord and joins each channel, keeping the connection alive.

## Setup Instructions

### 1. Prerequisites

- [Node.js](https://nodejs.org/) installed on your RDP or VPS.
- Your Discord bot or account token.
- Voice channel IDs from the Discord servers you want to join.

### 2. Installation

Open your command prompt or terminal and run:

```sh
git clone https://github.com/dr4g0n1x/ds-self-host.git
cd ds-self-host
npm install
```

### 3. Configuration

- Create a `.env` file in the project root.
- Paste your Discord bot or account token:

  ```
  TOKEN=your_discord_token_here
  ```

- Open `run.js` and fill the array with your desired voice channel IDs:

  ```js
  // run.js
  const voiceChannelIds = [
    '000000000000000000', // Replace with your voice channel IDs
    '000000000000000000'
  ];
  ```

### 4. Usage

To start the bot, run:

```sh
node run.js
```

Or with npm:

```sh
npm start
```

### 5. Optional: Using PM2 for Persistent Hosting (Recommended for VPS)

Install PM2 globally:

```sh
npm install -g pm2
```

Start the bot with PM2:

```sh
pm2 start run.js --name "discord-voice-host"
```

This keeps your bot running even after you disconnect from the server.

## Notes

- Make sure your token is kept secret and never shared.
- For user accounts, using self-bots is against Discord's Terms of Service; use at your own risk.
- For bots, ensure they have permission to join and speak in the target voice channels.

## License

MIT

## Contributing

Feel free to fork and