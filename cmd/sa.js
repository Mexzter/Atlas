const Discord = require("discord.js")


module.exports.run = (client, message, args) => {

    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("you have no permission to use this command!");

    let reply = args.join(" ");
    client.user.setActivity(reply, {type: "PLAYING"});

    const embed = new Discord.MessageEmbed()
    .setTitle("Action: Status change")
    .addField("New status:", reply)
    .setThumbnail('https://cdn.discordapp.com/attachments/811349819863859241/811352357811650600/atlas7.png')
    message.channel.send({embed})
}

module.exports.help = {
    name: "sa"
}