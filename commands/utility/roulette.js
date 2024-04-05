const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roulette')
        .setDescription('Choose an option from the roulette')
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Enter the options separated by commas')
                .setRequired(true)),

    async execute(interaction) {
        const options = interaction.options.getString('options').split(',');

        const randomIndex = Math.floor(Math.random() * options.length);

        const selectedOption = options[randomIndex];

        await interaction.reply(`${selectedOption}が選ばれました！`);
    },
};
