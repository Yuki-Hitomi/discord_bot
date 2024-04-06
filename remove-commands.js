const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('fs');
const path = require('path');

const commands = [];

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const commands = await rest.get(
      Routes.applicationCommands(clientId)
    );

    for (const command of commands) {
      const data = await rest.delete(
        Routes.applicationCommand(clientId, command.id)
      );
    }

    console.log(`Successfully removed ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
