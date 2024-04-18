const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const logger = require('./logger');

const rest = new REST().setToken(token);

if (guildId) {
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
        .then(() => logger.log('Successfully deleted all guild commands.'))
        .catch(logger.error);
} else {
    rest.put(Routes.applicationCommands(clientId), { body: [] })
        .then(() => logger.log('Successfully deleted all global commands.'))
        .catch(logger.error);
}
