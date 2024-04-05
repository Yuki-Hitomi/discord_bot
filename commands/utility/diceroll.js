const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diceroll')
		.setDescription('Roll the dice!')
		.addIntegerOption(option =>
			option.setName('dice')
				.setDescription('ダイスの個数')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('sides')
				.setDescription('ダイスの面数')
				.setRequired(true)),

	async execute(interaction) {
		const dice = interaction.options.getInteger('dice');
		const sides = interaction.options.getInteger('sides');
		let results = [];
		let total = 0;

		for(let i = 0; i < dice; i++) {
			let roll = Math.floor(Math.random() * sides) + 1;
			results.push(roll);
			total += roll;
		}

		let resultsList = results.map((result, index) => `ダイス${index + 1}: ${result}`).join('\n');
		await interaction.reply(`ダイスを振った結果は ${total} です！それぞれのダイスの結果は次のとおりです：\n${resultsList}`);
	},
};
