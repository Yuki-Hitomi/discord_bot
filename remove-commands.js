const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log('Started refreshing all application (/) commands.');

    const commands = await rest.get(
      Routes.applicationCommands(clientId)
    );

    for (const command of commands) {
      await rest.delete(
        Routes.applicationCommand(clientId, command.id)
      );
    }

    console.log('Successfully removed all application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
