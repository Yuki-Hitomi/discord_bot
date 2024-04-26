const { SlashCommandBuilder } = require('discord.js');
const { createCanvas } = require('canvas');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/baird.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('運勢とラッキーカラーを表示します。'),

    async execute(interaction) {
        const { fortune_id, fortune_text } = await getRandomFortune();
        const { color_id, color_text, color_code } = await getRandomColor();
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

        recordFortuneResult(interaction.user.id, fortune_id, color_id);

        console.info(`/fortune was executed by ${interaction.user.username}`);
    },
};

function getRandomFortune() {
    return new Promise((resolve, reject) => {
        db.get('SELECT id, fortune_text FROM fortunes ORDER BY RANDOM() LIMIT 1', (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
                return;
            }
            resolve({ fortune_id: row.id, fortune_text: row.fortune_text });
        });
    });
}

function getRandomColor() {
    return new Promise((resolve, reject) => {
        db.get('SELECT id, color_text, color_code FROM colors ORDER BY RANDOM() LIMIT 1', (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
                return;
            }
            resolve({ color_id: row.id, color_text: row.color_text, color_code: row.color_code });
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

function recordFortuneResult(user_id, fortune_id, color_id) {
    db.get('SELECT id FROM fortune_results WHERE user_id = ? AND delete_flg = 0', [user_id], (err, row) => {
        if (err) {
            console.error('Error checking for existing record:', err.message);
            return;
        }
        if (row) {
            db.run(
                'UPDATE fortune_results SET fortune_id = ?, color_id = ? WHERE user_id = ? AND delete_flg = 0',
                [fortune_id, color_id, user_id],
                (updateErr) => {
                    if (updateErr) {
                        console.error('Error updating fortune result:', updateErr.message);
                    } else {
                        console.log('Fortune result updated successfully.');
                    }
                }
            );
        } else {
            db.run(
                'INSERT INTO fortune_results (user_id, fortune_id, color_id) VALUES (?, ?, ?)',
                [user_id, fortune_id, color_id],
                (insertErr) => {
                    if (insertErr) {
                        console.error('Error recording fortune result:', insertErr.message);
                    } else {
                        console.log('Fortune result recorded successfully.');
                    }
                }
            );
        }
    });
}
