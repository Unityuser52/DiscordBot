const Discord = require("discord.js");
const colors = require("../json-files/colors.json");

module.exports.run = async (bot, message, args) => {

    const user = await bot.users.fetch('775014463278546944')
    if(!args[0]) return message.channel.send('Provide a message to send!');
    if (args[0].length > 1000) return message.channel.send('You cannot send a message with more then 1000 characters!');

    msg = args.slice(0).join(" ");
    let server = message.guild.id, // ID of the guild the message was sent in
    channel = message.channel.id // ID of the channel the message was sent in


    let UserSideEmbed = new Discord.MessageEmbed();
    UserSideEmbed.setTitle("**CONTACTED THE DEVELOPER**")
    UserSideEmbed.setURL("https://discord.gg/PXjNZ7AZPz")
    UserSideEmbed.setColor(colors.blue);
    UserSideEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
    UserSideEmbed.setDescription("The developer has been informed and will reply to you as soon as possible!")
    UserSideEmbed.addField('Your text:', `${msg}`)
    UserSideEmbed.addField('Your server id:', `${server}`)
    UserSideEmbed.addField('Your channel id:', `${channel}`)
    UserSideEmbed.addField('The channel the dev might answer in, if they do not answer through the bot they will dm you or join the server:', `<#${channel}>`)
    message.reply(UserSideEmbed)

    let DevSideEmbed = new Discord.MessageEmbed();
    DevSideEmbed.setTitle("**Support required**")
    DevSideEmbed.setColor(colors.red);
    DevSideEmbed.setDescription("You are needed!")
    DevSideEmbed.addField('Reason for call:', `> ${msg}`)
    DevSideEmbed.addField('Guild id:', `${server}`)
    DevSideEmbed.addField('Channel name:', `<#${channel}>`)
    DevSideEmbed.addField('Channel id:', `${channel}`)
    DevSideEmbed.addField('User:', `${message.author.tag}`)
    user.send(DevSideEmbed);
        
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`calldev.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}


module.exports.help = {
    name: "calldev",
    aliases: ["callsuport", "support", "test"]
}