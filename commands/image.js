var Scraper = require('images-scraper');
const google = new Scraper({
  puppeteer: {
    headless: true,
  },
});

module.exports.run = async (bot, message, args) => {
  
    const image_query = args.join(' ');
    if(!image_query) return message.channel.send('Please enter an image name');

    let msg = await message.channel.send('Fetching you an Image!');
    const image_results = await google.scrape(image_query, 1);
    msg.edit(image_results[0].url);

    let botEvents = bot.channels.cache.get("822938534881132554");
    botEvents.send(`image.js command executed succesfully in ${message.guild.name} by ${message.author.toString()}!`);
}

module.exports.help = {
    name: "image",
    aliases: ["img", "picture"]
}