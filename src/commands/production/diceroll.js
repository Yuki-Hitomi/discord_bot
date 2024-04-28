const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('diceroll')
        .setDescription('ダイスロールの結果を表示します。')
        .addIntegerOption(option =>
            option.setName('dice')
                .setDescription('ダイスの個数')
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(1)
        )
        .addIntegerOption(option =>
            option.setName('sides')
                .setDescription('ダイスの面数')
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(1)
        ),

    async execute(interaction) {
        // オプションからダイスの個数と面数を取得
        const dice = interaction.options.getInteger('dice');
        const sides = interaction.options.getInteger('sides');
        let results = [];
        let total = 0;

		console.info(`dice: ${dice}, sides: ${sides}`);

        // ダイスを振る処理
		console.info("Rolling dice...");
        for (let i = 0; i < dice; i++) {
            let roll = Math.floor(Math.random() * sides) + 1;
            results.push(roll);
            total += roll;
        }

        // リプライを送信
		console.info('Sending reply...');
        await interaction.reply(`${dice}D${sides}の結果は ${total} です！\n[${results.join(', ')}]`);
        console.info(`/diceroll was executed by ${interaction.user.username}`);
    },
};
