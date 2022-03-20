const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name: "ready", 

    /**
     * 
     * @param {Bot} client 
     */

    run: async(client) => {
        client.guilds.cache.forEach(guild => {
            client.db.query(`SELECT * FROM soutien WHERE guildId = ${guild.id}`, async(err, req) => {
                if(req.length < 1){
                    client.db.query(`INSERT INTO soutien (guildId, role, status, soutien) VALUES (${guild.id}, "null", "null", "false")`)
                }
            })
        })
    }
}