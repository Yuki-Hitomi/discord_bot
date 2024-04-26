const { SlashCommandBuilder } = require('discord.js');
const { createCanvas } = require('canvas');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/baird.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('運勢とラッキーカラーを表示します。'),

    async execute(interaction) {
        const fortune_text = await getRandomFortune();
        const { color_text, color_code } = await getRandomColor();
        const canvas = createColorCanvas(color_code);

        const embed = {
            title: `${color_text} (#${color_code.toUpperCase()})`,
            color: parseInt(color_code, 16),
            thumbnail: {
                url: 'attachment://color.png',
            },
        };

        await interaction.reply({
            content: `${interaction.member.displayName}の運勢は${fortune_text}です！\nラッキーカラーは ${color_text} です！`,
            files: [{ attachment: canvas.toBuffer(), name: 'color.png' }],
            embeds: [embed]
        });

        console.info(`/fortune was executed by ${interaction.user.username}`);
    },
};

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

function getRandomColor() {
    return new Promise((resolve, reject) => {
        db.get('SELECT color_text, color_code FROM colors ORDER BY RANDOM() LIMIT 1', (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
                return;
            }
            resolve({ color_text: row.color_text, color_code: row.color_code });
        });
    });
}

function createColorCanvas(color_code) {
    const canvas = createCanvas(250, 250);
    const context = canvas.getContext('2d');

    context.fillStyle = `#${color_code}`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
}
