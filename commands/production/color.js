const { SlashCommandBuilder } = require('discord.js');
const logger = require('../../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('color')
        .setDescription('ラッキーカラーを表示します。'),
    async execute(interaction) {
        const randomColor = getRandomColor();
        
        await interaction.reply({ content: `${interaction.member.displayName}のラッキーカラーは${randomColor}です！`, embeds: [createColorEmbed(randomColor)] });
        
        logger.log(`/color was executed by ${interaction.user.username}`);
    },
};

function getRandomColor() {
    const color = '0x' + Math.floor(Math.random()*16777215).toString(16);
    return color;
}

function createColorEmbed(color) {
    return {
        color: Number(color),
        description: color,
    };
}
