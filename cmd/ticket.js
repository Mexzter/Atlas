const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
message.delete();
//end of the vars
if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('you already have a ticket, please close your existing ticket first before opening a new one!');
		}
    message.guild.channels.create(`ticket-${message.author.id}`, {
  			permissionOverwrites: [
  				{
  					id: message.author.id,
  					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
  				},
          {
            id: client.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_CHANNELS'],
          },
  				{
  					id: '390628544369393664',
  					deny: ['VIEW_CHANNEL'],
  				},
					{
						id: '390644277560082435',
						allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_CHANNELS'],
					}
  			],
  			type: 'text',
  		}).then(async channel => {

				let reason = ("args: " + args.join(" "))


        let category = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
        channel.setParent(category.id, { lockPermissions: false });

  			message.reply(`you have successfully created a ticket! Click on ${channel} to view your ticket.`).then(msg=>msg.delete({timeout:"10000"/*Time until delete in milliseconds*/}))

				const channelEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(message.author.username + `'s ticket`)
				.setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
				.setDescription(`Welcome to your ticket! Please be patient, we will be with you shortly. If you would like to close this ticket please run \`.close\``)
				.addFields(
						{ name: 'Description', value: reason},
				)
				.setFooter(message.createdAt)

  			channel.send(channelEmbed);
  			const logchannel = message.guild.channels.cache.find(channel => channel.name === 'ticket-logs');
  			if(logchannel) {

					const ticketEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Ticket creation')
					.setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
					.addFields(
							{ name: 'Created by:', value: message.author.username, inline: true },
							{ name: 'Reason:', value: reason},
							{ name: 'Ticket:', value: `<#${channel.id}>`}
					)
					.setFooter(message.createdAt)

					logchannel.send(ticketEmbed);
  			}
  		});
}

module.exports.help = {
    name: "ticket"
}
