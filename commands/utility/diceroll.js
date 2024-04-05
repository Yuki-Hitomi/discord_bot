const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diceroll')
		.setDescription('Roll the dice!')
		.addIntegerOption(option =>
			option.setName('dice')
				.setDescription('ダイスの個数')
				.setRequired(true)
				.addNumberValidator(value => value >= 1 && value <= 99)) // ダイスの個数の範囲を1から99に制限
		.addStringOption(option =>
			option.setName('sides')
				.setDescription('ダイスの面数')
				.setRequired(true)
				.addChoice('4', 4)
				.addChoice('6', 6)
				.addChoice('8', 8)
				.addChoice('10', 10)
				.addChoice('12', 12)
				.addChoice('20', 20)
				.addChoice('100', 100)), // ダイスの面数の選択肢を指定

	async execute(interaction) {
		const dice = interaction.options.getInteger('dice');
		const sides = interaction.options.getString('sides');
		let results = [];
		let total = 0;

		for (let i = 0; i < dice; i++) {
			let roll = Math.floor(Math.random() * parseInt(sides)) + 1;
			results.push(`ダイス${(i + 1).toString().padStart(2, '0')}: ${roll}`);
			total += roll;
		}

		await interaction.reply(`ダイスを振った結果は ${total} です！それぞれのダイスの結果は次のとおりです：\n${results.join('\n')}`);
	},
};
