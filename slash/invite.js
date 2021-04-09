const Discord = require("discord.js")

module.exports = {
    slash: true,
    testOnly: false,
    description: "Add the bot to another server",
    callback: ({}) => {
        // if (message) {
        //     const yourEmbed = new Discord.MessageEmbed;
        //     yourEmbed.addField("Thank you for considering inviting the bot to your server", "To invite the bot click [this link!](https://discord.com/api/oauth2/authorize?client_id=821129128681668658&permissions=8&scope=bot%20applications.commands)");
        //     message.reply(yourEmbed)
        // }
        
    const yourEmbed = new Discord.MessageEmbed;
    yourEmbed.addField("Thank you for considering inviting the bot to your server", "To invite the bot click [this link!](https://discord.com/api/oauth2/authorize?client_id=821129128681668658&permissions=8&scope=bot%20applications.commands)");
    return (yourEmbed);

    },
}


