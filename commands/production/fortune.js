const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fortune')
		.setDescription('おみくじを行います。'),
		
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
		await interaction.reply(`${interaction.member.displayName}の運勢は${fortunes[randomIndex]}です！`);
		console.log(`/fortune was executed by ${interaction.user.username}`);
	},
};
