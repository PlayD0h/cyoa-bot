const settings = require.main.require("./configuration/settings.json");
const commando = require('discord.js-commando');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./configuration/cyoa_bot.db');

class Initialize1Command extends commando.Command {

    constructor(client) {
        super(client, {
            name: 'initialize1',
            group: 'initialize',
            memberName: 'initialize1',
            description: 'First step of initializing CYOA-BOT...'
        })

    }

        async run(message, args) {
            if (message.author.bot) return;
            if (message.channel.type === "dm") return;
            if (settings.guildInfo.guildName === "") return message.reply("**settings.json has not been properly configured!...**"); 
            db.run(`CREATE TABLE IF NOT EXISTS ${settings.guildInfo.guildName} (guildId REAL, ownerId REAL, init_final BOOLEAN, init_1 BOOLEAN, init_2 BOOLEAN, init_3 BOOLEAN)`);
            
            let row = db.get(`SELECT * FROM ${settings.guildInfo.guildName} WHERE ownerId = "${message.author.id}"`);

            try { 
                let row = db.get(`SELECT * FROM ${settings.guildInfo.guildName} WHERE ownerId = "${message.author.id}"`);

                if (!row) { // Can't find the row.
                db.run(`INSERT INTO ${settings.guildInfo.guildName} (guildId REAL, ownerId REAL, init_final BOOLEAN, init_1 BOOLEAN, init_2 BOOLEAN, init_3 BOOLEAN) VALUES (?, ?, ?, ?, ?, ?)`, [message.guild.id, message.author.id, false, true , false, false]);
                } else { // Can find the row.
                message.reply("**You have already completed [Initialization Step 1]!...**");
                }

        } catch(e) {
            console.log(e.stack);
            
        }
    }   
} 
module.exports = Initialize1Command;
