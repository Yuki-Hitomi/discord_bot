const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roulette')
        .setDescription('Choose an option from the roulette')
        .addStringOption(option =>
            option.setName('option1')
                .setDescription('Enter option 1')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option2')
                .setDescription('Enter option 2')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option3')
                .setDescription('Enter option 3'))
        .addStringOption(option =>
            option.setName('option4')
                .setDescription('Enter option 4'))
        .addStringOption(option =>
            option.setName('option5')
                .setDescription('Enter option 5'))
        .addStringOption(option =>
            option.setName('option6')
                .setDescription('Enter option 6'))
        .addStringOption(option =>
            option.setName('option7')
                .setDescription('Enter option 7'))
        .addStringOption(option =>
            option.setName('option8')
                .setDescription('Enter option 8'))
        .addStringOption(option =>
            option.setName('option9')
                .setDescription('Enter option 9'))
        .addStringOption(option =>
            option.setName('option10')
                .setDescription('Enter option 10')),
    async execute(interaction) {
        const option1 = interaction.options.getString('option1');
        const option2 = interaction.options.getString('option2');
        const option3 = interaction.options.getString('option3');
        const option4 = interaction.options.getString('option4');
        const option5 = interaction.options.getString('option5');
        const option6 = interaction.options.getString('option6');
        const option7 = interaction.options.getString('option7');
        const option8 = interaction.options.getString('option8');
        const option9 = interaction.options.getString('option9');
        const option10 = interaction.options.getString('option10');

        const options = [option1, option2, option3, option4, option5, option6, option7, option8, option9, option10];

        const randomIndex = Math.floor(Math.random() * options.length);

        const selectedOption = options[randomIndex];

        await interaction.reply(`${selectedOption}が選ばれました！`);
    },
};
