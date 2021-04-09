module.exports.run = async (bot, message, args) => {
    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
    await voiceChannel.leave();
    await message.channel.send('Leaving channel :smiling_face_with_tear:')
        
    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`stop.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);

}
module.exports.help = {
    name: "stop",
    aliases: ["leave"]
}