const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Bot Status</title>
        <style>
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: black;
            color: red;
          }
          h1 {
            font-size: 5em;
          }
        </style>
      </head>
      <body>
        <h1>ON</h1>
      </body>
    </html>
  `);
});


require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');
const { setTimeout } = require('timers/promises');

const voiceChannels = ['000000000000000000','000000000000000000']; // Replace with your voice channel IDs

const checkAndJoin = async (client, channelId) => {
  try {
    const channel = client.channels.cache.get(channelId);
    if (!channel) {
      console.error(`Channel not found with ID: ${channelId}`);
      return;
    }

    const guild = channel.guild;
    const member = guild.members.cache.get(client.user.id);

    if (!member) {
      console.error(`Bot is not a member of the guild (${guild.name}) associated with the channel ID: ${channelId}`);
      return;
    }

    const userVoiceState = guild.voiceStates.cache.get(member.id);

    if (!userVoiceState || !userVoiceState.channelId) {
      const voiceConnection = joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfMute: true,
        selfDeaf: true,
      });

      voiceConnection.once('stateChange', (state) => {
        if (state.status === 'CONNECTED') {
          console.log(`${member.displayName} is in ${guild.name}`);
          console.log(`Bot joined voice channel ${channel.name} in ${guild.name}`);
        }
      });

      voiceConnection.on('error', (error) => {
        console.error('Error in voice connection:', error);
      });
    }
  } catch (error) {
    console.error('Error checking and joining:', error);
  }
};

voiceChannels.forEach((channelId) => {
  const client = new Client({ checkUpdate: false });

  client.once('ready', () => {
    checkAndJoin(client, channelId);
    setInterval(() => checkAndJoin(client, channelId), 30000);
  });

    
  
  client.login(process.env.token);
});
