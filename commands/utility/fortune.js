const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fortune')
		.setDescription('Get your fortune!'),
		
	async execute(interaction) {
		const fortunes = [
			'大吉',
			'中吉',
			'小吉',
			'吉',
			'半吉',
			'末吉',
			'末小吉',
			'凶',
			'小凶',
			'半凶',
			'末凶',
			'大凶'
		];
		
		const randomIndex = Math.floor(Math.random() * fortunes.length);
		await interaction.reply(`${interaction.user.username}の運勢は${fortunes[randomIndex]}です！`);
	},
};
