const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  message.delete();
  const embed = new Discord.MessageEmbed()
  .setColor(0x0A9693)
  .setThumbnail('https://cdn.discordapp.com/attachments/811349819863859241/811352357811650600/atlas7.png')
  .setTitle("How to request support")
  .addFields(
    { name: 'Reporting spammers', value: `Head over to <#396316232124727296> and upload a screenshot of the scammer. Also include the user ID which can be found by right clicking the user and clicking "Copy ID"`},
    { name: 'Tickets', value: `If you need additional help or have other issues please create a ticket by running \`.ticket (reason)\``},
    { name: '\u200B', value: '\u200B'},
    { name: 'Important', value: 'Please do not create tickets to reports spammers, check above on how to report spammers. \n\n⚠️ *Abuse of the ticket system will result in a ban*'}

  )

  message.channel.send({embed})

}

module.exports.help = {
    name: "support"
}
