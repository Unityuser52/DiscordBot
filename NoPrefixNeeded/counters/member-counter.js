module.exports = async (bot) =>{
    let guild = bot.guilds.cache.get('822938533349425182');
    setInterval(() =>{
        let totalcount = guild.memberCount;
        let totalchannel = guild.channels.cache.get('822969597782654998');

        let botcount = guild.members.cache.filter(member => member.user.bot).size;
        let botchannel = guild.channels.cache.get('822969619044106260');

        let memberCount = guild.members.cache.filter(member => !member.user.bot).size;
        let memberCountChannel = guild.channels.cache.get("822969635484729374");

        totalchannel.setName(`Total Members: ${totalcount.toLocaleString()}`);
        console.log('Updating All Member Count');

        memberCountChannel.setName(`Members: ${memberCount.toLocaleString()}`);
        console.log('Updating Member Count');

        botchannel.setName(`Bots: ${botcount.toLocaleString()}`);
        console.log('Updating Bot Count');

    }, 900000);
}
