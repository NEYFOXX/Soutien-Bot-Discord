const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'prefix',
    aliases: ['setprefix'],

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        try{
            if(!message.member.permissions.has('MANAGE_GUILD') && !client.config.owners.includes(message.author.id)) return message.reply(`Vous n'avez pas les permissions necessaires`).catch(e=>{})
            let newprefix = args[0]
            if(!newprefix) return message.channel.send("Vous ne m'avez donné aucun prefix").catch(e=>{})
            client.db.query(`SELECT * FROM settings WHERE serverid = ${message.guild.id}`, async(err, data) => {
                if(newprefix===data[0].prefix) return message.channel.send("Ce prefix est exactement le même que le prefix que je possède actuellement"); 
            }); 
            client.db.query(`UPDATE settings SET prefix = "${newprefix}" WHERE serverid = ${message.guild.id}`); 
            message.channel.send(`Désormais mon nouveau prefix est \`${newprefix}\``); 
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}
