const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
message.delete();

if(message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			if(message.member.hasPermission('ADMINISTRATOR') || message.channel.name === `ticket-${message.author.id}`)
      message.channel.delete();
  } else {
    message.reply("Can not delete this channel as this is not an active ticket!")
  } 
}

module.exports.help = {
    name: "close"
}
