const { REST, Routes } = require('discord.js');
const { clientId, devflg, token } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');

const foldersPath = path.join(__dirname, 'commands');
const rest = new REST().setToken(token);
const commandFolders = []

if (devflg == 1) {
	commandFolders.push('staging')
	commandFolders.push('production')
}else{
	commandFolders.push('production')
}

console.info(`commandFolders : ${commandFolders}`);

for (const folder of commandFolders) {
	const commands = [];
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

	console.info(`Deploying PRODUCTION commands...`);
	rest.put(Routes.applicationCommands(clientId), { body: commands })
		.then(() => console.info(`Successfully deployed ${folder} commands.`))
		.catch(console.error);
}
