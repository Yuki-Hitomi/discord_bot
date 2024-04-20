const { SlashCommandBuilder } = require('discord.js');
const { createCanvas } = require('canvas');
const logger = require('../../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('color')
        .setDescription('ラッキーカラーを表示します。'),
    async execute(interaction) {
        const randomColor = getRandomColor();
        const canvas = createColorCanvas(randomColor);
        
        const embed = {
            title: `#${randomColor.toUpperCase()}`,
            color: parseInt(randomColor, 16),
            thumbnail: {
                url: 'attachment://color.png',
            },
        };
        
        await interaction.reply({ content: `${interaction.member.displayName}のラッキーカラーは #${randomColor.toUpperCase()} です！`, files: [{ attachment: canvas.toBuffer(), name: 'color.png' }], embeds: [embed] });
        
        logger.log(`/color was executed by ${interaction.user.username}`);
    },
};

function getRandomColor() {
    const color = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    return color;
}

function createColorCanvas(color) {
    const canvas = createCanvas(250, 250);
    const context = canvas.getContext('2d');
    
    context.fillStyle = `#${color}`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    return canvas;
}
