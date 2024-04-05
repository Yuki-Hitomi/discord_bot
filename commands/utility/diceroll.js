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
				.setRequired(true))
                .choices([
                    {name: "4", value: "4"},
                    {name: "6", value: "6"},
                    {name: "8", value: "8"},
                    {name: "10", value: "10"},
                    {name: "12", value: "12"},
                    {name: "20", value: "20"},
                    {name: "100", value: "100"},
                ]),

	async execute(interaction) {
		const dice = interaction.options.getInteger('dice');
		const sides = interaction.options.getInteger('sides');
		let results = [];
		let total = 0;

		for(let i = 0; i < dice; i++) {
			let roll = Math.floor(Math.random() * sides) + 1;
			results.push(`ダイス${(i+1).toString().padStart(2, '0')}: ${roll}`);
			total += roll;
		}

		await interaction.reply(`ダイスを振った結果は ${total} です！\nそれぞれのダイスの結果は次のとおりです：\n${results.join('\n')}`);
	},
};
