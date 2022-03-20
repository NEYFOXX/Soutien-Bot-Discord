const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    aliases: ['speed'],

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        try {
            let embed = new Discord.MessageEmbed()
            .setDescription(`Bot : ${client.ws.ping} ms`)
            .setColor("BLACK"); 

            client.db.query(`SELECT * FROM settings WHERE serverid = ${message.guild.id}`, async(err, req) => {
                let a = Date.now();
            
                
            client.db.query(`SELECT * FROM settings WHERE serverid = ${message.guild.id}`, async(err, req) => {
                let b = Date.now();
            
            let msg = message.channel.send({embeds: [embed]});

            let dbping = b - a;

            let api = (await msg).createdAt - message.createdAt 
            embed.setDescription(`Bot : ${client.ws.ping} ms\nApi : ${api} ms\nBDD : ${dbping} ms`); 

            (await msg).edit({embeds: [embed]}); 
            });
        });
        }catch(err){console.error}
    }
}