const { SlashCommandBuilder } = require('discord.js');
const { createCanvas } = require('canvas');
const logger = require('../../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('運勢とラッキーカラーを表示します。'),

    async execute(interaction) {
        const fortunes = ['大吉', '中吉', '小吉', '吉', '半吉', '末吉', '末小吉', '凶', '小凶', '半凶', '末凶', '大凶'];
        const randomFortuneIndex = Math.floor(Math.random() * fortunes.length);
        const randomColor = getRandomColor();
        const canvas = createColorCanvas(randomColor);

        const embed = {
            title: `#${randomColor.toUpperCase()}`,
            color: parseInt(randomColor, 16),
            thumbnail: {
                url: 'attachment://color.png',
            },
        };

        await interaction.reply({
            content: `${interaction.member.displayName}の運勢は${fortunes[randomFortuneIndex]}です！\nラッキーカラーは #${randomColor.toUpperCase()} です！`,
            files: [{ attachment: canvas.toBuffer(), name: 'color.png' }],
            embeds: [embed]
        });

        logger.log(`/fortune was executed by ${interaction.user.username}`);
    },
};

function getRandomColor() {
    const color = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return color;
}

function createColorCanvas(color) {
    const canvas = createCanvas(250, 250);
    const context = canvas.getContext('2d');

    context.fillStyle = `#${color}`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
}
