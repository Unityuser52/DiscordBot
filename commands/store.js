const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`store.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
    return message.reply("Sorry this command is still in development :cry:");
    const embed = new Discord.MessageEmbed()
    .setTitle('Store')
    .setDescription(`lol - 500 coins \n this is stupid :/ - 250 coins`)
    .setTimestamp();

    message.channel.send(embed);
        
    
}

module.exports.help = {
    name: "store",
    aliases: []
}