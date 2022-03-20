const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
module.exports = {
    name: 'messageCreate',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     */
    run: async (client, message) => {
        try {
            if (!message) return 
            if (!message.guild || !message.author) return
            if(message.author.bot) return
            client.db.query(`SELECT * FROM settings WHERE serverid = ${message.guild.id}`, async(err, req) => {
            if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) return message.reply(`Mon prefix est \`${req[0].prefix}\``).catch(e => { })
            if (!message.content.startsWith(req[0].prefix) || message.content === req[0].prefix || message.content.startsWith(req[0].prefix + ' ')) req[0].prefix = `<@${client.user.id}>`
            if (!message.content.startsWith(req[0].prefix) || message.content === req[0].prefix || message.content.startsWith(req[0].prefix + ' ')) req[0].prefix = `<@!${client.user.id}>`
            if (!message.content.startsWith(req[0].prefix) || message.content === req[0].prefix || message.content.startsWith(req[0].prefix + ' ')) return
            const args = message.content.slice(req[0].prefix.length).trim().split(/ +/g)
            const commandName = args[0].toLowerCase().normalize()
            const cmd = client.commands.get(commandName) || client.aliases.get(commandName)
            args.shift()
            if (!cmd) return
            cmd.run(client, message, args, commandName)
            });
        } catch (err) {
            console.log("messageCreate error : " + err)
        }
    }
}