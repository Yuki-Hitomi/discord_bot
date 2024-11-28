const { REST, Routes } = require('discord.js');
const { clientId, token } = require('../config.json');

const rest = new REST().setToken(token);

console.info(`Remove all commands...`);
rest.put(Routes.applicationCommands(clientId), { body: [] })
    .then(() => console.info('Successfully removed all commands.'))
    .catch(console.error);
    