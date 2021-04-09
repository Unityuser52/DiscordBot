 const Discord = require('discord.js');

module.exports = async (bot, message) => {
    var message1 = message.content.toLowerCase();
    var words = ["fuck", "shit", "dick", "motherfucker", "bitch", 
    "slut", 
]
    const channel = bot.channels.cache.get('822938534436012048')

    for (var i = 0; i < words.length; i++) {

        if (message1.includes(words[i])) {

            message.delete();
            const badwordEmbed = new Discord.MessageEmbed()
            .setTitle('Bad word deleted!')
            .addField('Message author:', message.author.toString(), true)
            .addField('Server name:', message.guild.name, true)
            .addField('Server id::', message.guild.id, true)
            .addField('Bad word:', message1, true)
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            channel.send(badwordEmbed);
            console.log('Bad word reported')
            //send the embed to the channel
            message.channel.send("**Hey! That word is not allowed!! :rage:**")

        }

    }
}