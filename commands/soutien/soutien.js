const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name: "soutien", 
    description: "Gérer le système de soutien", 
    usage: "+soutien",
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.member.permissions.has("MANAGE_GUILD")){
            if(!args.length) return message.channel.send("Veuillez préciser `role/status/on/off`"); 

            if(args[0] === "role"){
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]); 
                if(!role) return message.channel.send("Donnez moi le role soutien"); 

                client.db.query(`SELECT * FROM soutien WHERE guildId = ${message.guild.id}`, async(err, req) => {
                    if(req[0].role === role.id) return message.channel.send("Ce role est déjà le role soutien de ce serveur"); 
                }); 

                client.db.query(`UPDATE soutien SET role = "${role.id}" WHERE guildId = ${message.guild.id}`); 
                message.channel.send(`<@${role.id}> sera désormais le role soutien`); 
            }
            if(args[0] === "status"){
                let status = args.slice(1).join(" "); 
                if(!status) return message.channel.send("Donnez moi le status qui prouvera que la personne vous soutienne");
                client.db.query(`SELECT * FROM soutien WHERE guildId = ${message.guild.id}`, async(err, req) => {
                    if(req[0].status === status) return message.channel.send("Ce status est déjà le status de soutien de ce serveur"); 
                });

                client.db.query(`UPDATE soutien SET status = "${status}" WHERE guildId = ${message.guild.id}`); 
                message.channel.send(`Ce status a bien été enregistré en tant que status soutien du serveur\n**${status}**`); 
            }
            if(args[0] === "on"){
                client.db.query(`SELECT * FROM soutien WHERE guildId = ${message.guild.id}`, async(err, req) => {
                    if(req[0].soutien === "true") return message.channel.send("Le système de soutien de ce serveur est déjà activé"); 
                }); 

                client.db.query(`UPDATE soutien SET soutien = "true" WHERE guildId = ${message.guild.id}`); 
                message.channel.send(`Le système de soutien est désormais **activé**`); 
            }
            if(args[0] === "off"){
                client.db.query(`SELECT * FROM soutien WHERE guildId = ${message.guild.id}`, async(err, req) => {
                    if(req[0].soutien === "false") return message.channel.send("Le système de soutien de ce serveur est déjà désactivé"); 
                }); 

                client.db.query(`UPDATE soutien SET soutien = "false" WHERE guildId = ${message.guild.id}`); 
                message.channel.send(`Le système de soutien est désormais **désactivé**`); 
            }
        }
    }
}