const Discord = require("discord.js");
const colors = require("../json-files/colors.json");

module.exports.run = async (bot, message, args) => {

    let gifs = [
        // "https://tenor.com/RQFB.gif",
        "https://i.pinimg.com/originals/4b/8e/cb/4b8ecb3cecf533e534d829ca3daef2dd.gif"
        // "https://tenor.com/wbEH.gif"
    ]
    let pick = gifs[Math.floor(Math.random() * gifs.length)];

    let embed = new Discord.MessageEmbed();
    embed.setColor(colors.purple);
    

    if(args[0]) {
        let user = message.mentions.members.first();
        embed.setTitle(`${message.author.username} hugs ${bot.users.cache.get(user.id).username}!`);
        embed.setImage(pick);
    } else {
        embed.setTitle(`${message.author.username} wants a hug.`);
        embed.setImage("https://orig00.deviantart.net/cf74/f/2012/045/3/1/i_really_need_a_hug_by_sarky_sparky-d4pq601.gif");
    }

    message.channel.send(embed);
        
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`hug.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);

}

module.exports.help = {
    name: "hug",
    aliases: []
}