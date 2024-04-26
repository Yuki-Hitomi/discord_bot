const { SlashCommandBuilder } = require('discord.js');
const { createCanvas } = require('canvas');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/baird.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('運勢とラッキーカラーを表示します。'),

    async execute(interaction) {
        const fortune = await getRandomFortune();

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
            content: `${interaction.member.displayName}の運勢は${fortune}です！\nラッキーカラーは #${randomColor.toUpperCase()} です！`,
            files: [{ attachment: canvas.toBuffer(), name: 'color.png' }],
            embeds: [embed]
        });

        console.info(`/fortune was executed by ${interaction.user.username}`);
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

function getRandomFortune() {
    return new Promise((resolve, reject) => {
        db.get('SELECT fortune_text FROM fortunes ORDER BY RANDOM() LIMIT 1', (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
                return;
            }
            resolve(row.fortune_text);
        });
    });
}
