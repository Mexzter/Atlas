const Discord = require("discord.js")


module.exports.run = (client, message, args) => {
message.delete();
//end of the vars

    const embed = new Discord.MessageEmbed()
    .setColor(0x0A9693)
    .setThumbnail('https://cdn.discordapp.com/attachments/811349819863859241/811352357811650600/atlas7.png')
    .setTitle("Action: Bot info")
    .addField("Memory Used", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed() + "MB")

    message.channel.send({embed})
}

module.exports.help = {
    name: "binfo"
}