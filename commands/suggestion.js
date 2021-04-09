const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    const mychannel = bot.channels.cache.get('822938533823512625')


    let  messageArgs = args.join(' ');
    const mychannelembed = new Discord.MessageEmbed()
    .setColor('FADF2E')
    .addField('Author', message.author.toString(), true)
    .addField('Guild', message.guild.name, true)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
    .setDescription(messageArgs);

    mychannel.send(mychannelembed).then((msg) =>{
        msg.react('👍');
        msg.react('👎');
        message.delete();
    }).catch((err)=>{
        throw err;
    });
    const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
    if(!channel) return message.channel.send('For this to work in your server you need a channel named: suggestions');

    if(channel) {
        const embed = new Discord.MessageEmbed()
        .setColor('FADF2E')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
        .setDescription(messageArgs);

        channel.send(embed).then((msg) =>{
            msg.react('👍');
            msg.react('👎');
        }).catch((err)=>{
            throw err;
        });
    }
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`suggestion.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}

module.exports.help = {
    name: 'suggestion',
    aliases: ['suggest', 'suggestions']
}