const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST().setToken(token);

if (guildId) {
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
        .then(() => console.log('Successfully deleted all guild commands.'))
        .catch(console.error);
} else {
    rest.put(Routes.applicationCommands(clientId), { body: [] })
        .then(() => console.log('Successfully deleted all global commands.'))
        .catch(console.error);
}