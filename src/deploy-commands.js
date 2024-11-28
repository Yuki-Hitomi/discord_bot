const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	console.info(`Deploying ${folder} commands...`);
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.info(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(token);

if (guildId) {
	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
		.then(() => console.info('Successfully reloaded all guild commands.'))
		.catch(console.error);
} else {
	rest.put(Routes.applicationCommands(clientId), { body: commands })
		.then(() => console.info('Successfully reloaded all global commands.'))
		.catch(console.error);
}
