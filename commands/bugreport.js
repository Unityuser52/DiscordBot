const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    //the channel you want the bug-reports to be send to
    const channel = bot.channels.cache.get('822938533823512626')

        //look if there is a bug specified
    const query = args.join(' ');
    if(!query) return message.reply('Please specify the bug')
    
        //create an embed for the bug report
    const reportEmbed = new Discord.MessageEmbed()
    .setTitle('New Bug!')
    .addField('Author', message.author.toString(), true)
    .addField('Guild', message.guild.name, true)
    .addField('Report', query)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    channel.send(reportEmbed);
    console.log('Bug report sent!!')
    //send the embed to the channel
    message.channel.send("**Bug report has been sent!**")   

    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`bugreport.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}
module.exports.help = {
    name: "bugreport",
    aliases: ["bug", "report"]
}