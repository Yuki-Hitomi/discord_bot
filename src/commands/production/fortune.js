const { SlashCommandBuilder } = require('discord.js');
const { createCanvas } = require('canvas');
const sqlite3 = require('sqlite3').verbose();

// データベースの接続
const db = new sqlite3.Database('database/baird.db');

module.exports = {
    // コマンドの設定
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('今日の運勢とラッキーカラーを表示します。'),

    // コマンドの実行
    async execute(interaction) {
        // データベースから当日のデータを取得
        db.get('SELECT * FROM fortune_results WHERE user_id = ? AND DATE(updated_at) = DATE(\'now\', \'localtime\')', [interaction.user.id], async (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            
            let fortune_id, fortune_text, color_code;
            
            if (row) {
                // データがある場合はリザルトテーブルから取得
                console.info('Data matching the date was found:', row);
                fortune_id = row.fortune_id;
                const fortuneRow = await getFortuneById(fortune_id);
                fortune_text = fortuneRow.fortune_text;
                color_code = row.color_code;
            } else {
                // データがない場合はランダムな運勢を取得して記録
                console.info('No data found for today. Generating new fortune...');
                const { fortune_id: id, fortune_text: text } = await getRandomFortune();
                fortune_id = id;
                fortune_text = text;
                color_code = getRandomColor();
                recordFortuneResult(interaction.user.id, fortune_id, color_code);
            }
    
            // カラーキャンバスを作成
            console.info('Creating color canvas...');
            const canvas = createColorCanvas(color_code);
    
            // カラーコードからRGBに変換
            const red = parseInt(color_code.substring(0, 2), 16);
            const green = parseInt(color_code.substring(2, 4), 16);
            const blue = parseInt(color_code.substring(4, 6), 16);
    
            // エンベッドの設定
            const embed = {
                title: `#${color_code}`,
                description:`[Red: ${red}, Green: ${green}, Blue: ${blue}]`,
                color: parseInt(color_code, 16),
                thumbnail: {
                    url: 'attachment://color.png',
                },
            };
    
            // リプライを送信
            console.info('Sending reply...');
            await interaction.reply({
                content: `今日の${interaction.member.displayName}の運勢は${fortune_text}です！\nラッキーカラーは #${color_code} です！`,
                files: [{ attachment: canvas.toBuffer(), name: 'color.png' }],
                embeds: [embed]
            });
    
            console.info(`/fortune was executed by ${interaction.user.username}`);
        });
    }
    
};

// ランダムな運勢を取得する関数
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

// IDから運勢テキストを取得する関数
function getFortuneById(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT fortune_text FROM fortunes WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
                return;
            }
            resolve(row);
        });
    });
}

// ランダムなカラーコードを生成する関数
function getRandomColor() {
    const color_code = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    return color_code;
}

// カラーキャンバスを作成する関数
function createColorCanvas(color_code) {
    const canvas = createCanvas(250, 250);
    const context = canvas.getContext('2d');

    context.fillStyle = `#${color_code}`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
}

// 運勢結果を記録する関数
function recordFortuneResult(user_id, fortune_id, color_code) {
    db.get('SELECT id FROM fortune_results WHERE user_id = ? AND delete_flg = 0', [user_id], (err, row) => {
        if (err) {
            console.error('Error checking for existing record:', err.message);
            return;
        }
        if (row) {
            // レコードがある場合は更新する
            db.run(
                'UPDATE fortune_results SET fortune_id = ?, color_code = ? WHERE user_id = ? AND delete_flg = 0',
                [fortune_id, color_code, user_id],
                (updateErr) => {
                    if (updateErr) {
                        console.error('Error updating fortune result:', updateErr.message);
                    } else {
                        console.info('Fortune result updated successfully.');
                    }
                }
            );
        } else {
            // レコードがない場合は挿入する
            db.run(
                'INSERT INTO fortune_results (user_id, fortune_id, color_code) VALUES (?, ?, ?)',
                [user_id, fortune_id, color_code],
                (insertErr) => {
                    if (insertErr) {
                        console.error('Error recording fortune result:', insertErr.message);
                    } else {
                        console.info('Fortune result recorded successfully.');
                    }
                }
            );
        }
    });
}
