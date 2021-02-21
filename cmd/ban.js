const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

    var uAmount = args.length
    const member = message.mentions.users.first(uAmount);
    var guild = message.guild
    var cases = "1"

    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("you have no permission to use this command!");

    if(uAmount == 0) {
        message.channel.send("Missing arguments use the correct format: ;mban [users]")
        return;
    }

    message.reply('Reason?').then(msg => {
        msg.delete({ timeout: 15000 /*time unitl delete in milliseconds*/});
    });
        message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000}).then(collected => {
        if (collected.first().content.length > 0) {
            var BanReason = collected.first().content
            collected.first().delete();
            member.forEach((f, i) => {		// f is the element of jsfiles[] i is our internal counter
                guild.members.ban(f, {reason: BanReason})        
            }, 1000);

            const banEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('**Action: Ban**')
            .setThumbnail('https://cdn.discordapp.com/attachments/811349819863859241/811352357811650600/atlas7.png')
            .addFields(
                { name: 'Banned:', value: uAmount + " user(s)" },
                { name: 'Reason:', value: BanReason, inline: true }
            )
        message.channel.send(banEmbed);

        const logEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Issuer:${message.author.tag} || **Action: Ban**`)
        .setThumbnail('https://cdn.discordapp.com/attachments/811349819863859241/811352357811650600/atlas7.png')
        .addFields(
            { name: 'Banned:', value: uAmount + " user(s)" },
            { name: 'Reason:', value: BanReason, inline: true }
        ) 
        const logchannel = client.channels.cache.get('483552488948105216');

        logchannel.send(logEmbed);
           
    } else
        message.reply('Operation canceled.');      
    });
}

module.exports.help = {
	name: "mban"
}
