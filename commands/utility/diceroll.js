const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diceroll')
		.setDescription('Roll the dice!')
		.addStringOption(option =>
			option.setName('dice')
				.setDescription('ダイスの個数')
				.setRequired(true)
                .addChoice('1', '1')
                .addChoice('2', '2')
                .addChoice('3', '3'))
		.addStringOption(option =>
			option.setName('sides')
				.setDescription('ダイスの面数')
				.setRequired(true)
                .addChoice('6', '6')
                .addChoice('8', '8')
                .addChoice('10', '10')),

	async execute(interaction) {
		const dice = interaction.options.getString('dice');
		const sides = interaction.options.getString('sides');
		let results = [];
		let total = 0;

		for(let i = 0; i < dice; i++) {
			let roll = Math.floor(Math.random() * sides) + 1;
			results.push(`ダイス${(i+1).toString().padStart(2, '0')}: ${roll}`);
			total += roll;
		}

		await interaction.reply(`ダイスを振った結果は ${total} です！それぞれのダイスの結果は次のとおりです：\n${results.join('\n')}`);
	},
};
