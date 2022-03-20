const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name: "presenceUpdate", 
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Presence} newPresence 
     * @param {Discord.Presence} oldPresence 
     */
    run: async(client, newPresence, oldPresence) => {
        client.db.query(`SELECT * FROM soutien WHERE guildId = ${oldPresence.guild.id}`, async(err, req) => {
            if(req[0].soutien === "false") return;
            if(req[0].role === "null") return;
            if(req[0].status === "null") return;

            let status = newPresence.activities.map(a => a.state);
            let member = newPresence.guild.members.cache.get(newPresence.member.user.id); 
            if(!member) return;
            if(status[0] && status[0].includes(req[0].status)){
                member.roles.add(req[0].role, 'Soutien').catch(err => console.log(`[ERROR] - ${err}`));
            } else {
                if(member.roles.cache.some(r => r.id === req[0].status)){
                    member.roles.remove(req[0].role, 'Soutien').catch(err => console.log(`[ERROR] - ${err}`)); 
                }
            }
        })
    }
}