const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone : false});
const botconfig = require("./botconfig.json");
//fs-extra//emoji.szena mondjuk xd
// const cooldown = require("./cooldown.json");
let name = "R6 magyar bot";

////////////////////////////////////////////////

//Feljebb vannak a globális változók.
 
 
 
bot.on("ready", async() => { //bot.on kezdete
    console.log(`${bot.user.username} elindult sikeresen!`)
 
//status :d   
let prefix = botconfig.prefix; 
    let statusok = [
        `parancsok: !help`,
        `R6 magyar bot`,
        `fejlesztő: Magyar Games`

    ]
    
 
    setInterval(function(){
        let status = statusok[Math.floor(Math.random() * statusok.length)];
        bot.user.setActivity(status, {type: "WATCHING"}) 
    }, 3000) 


}); //itt vége a bot.on nak
 
 
 
bot.on("message", async message => { //bot on kezdete
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
 //prefix messageArray és cmd :D cmd = 0. karakter prefix = botconfig.prefix :D
    let prefix = botconfig.prefix; 
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
 


/////////////////////////////////////////////////////////////
 
   if(cmd === `!help`){
 
 
    let botThumb = bot.user.displayAvatarURL;
    let testembed = new Discord.RichEmbed()
    .setTitle(`${name}`)
    .setColor("#2DE7F7")
    .addBlankField()
    .addField("Parancsok:", "ˇˇˇ")
    .addBlankField()
    .addField(`!kick <@név>`, "Ember kickelése.")
    .addField(`!ban <@név>`, "Ember bannolása.")
    .addField(`!szia-bot`, "Vissza ír hogy szia.")
    .addField(`!hali`, "Bepingel mindenkit")
    .addField(`!verseny <név>`, "Verseny")
    .addBlankField()
    .addField("A bot fejlesztője: Magyar Games", "<3")
    .setThumbnail(botThumb)
    .setTimestamp(message.createdAt)
    .setFooter(`${name}`);
 
    message.channel.send(testembed);
    
}

if(cmd === "!szia-bot"){
    message.reply("Szia!");
}

if(cmd === `${prefix}verseny`) {
    let asd = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(asd) {
        message.channel.send(`${asd.user.username} RedPower.JW`);
    } else message.reply("Kérlek adj meg egy nevet!");
}

if(cmd === `${prefix}hali`){
    message.channel.send("@everyone");
}


if(cmd === `${prefix}kick`) {
    if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
    let kickPerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (kickPerson) {
    if (!kickPerson.hasPermission("KICK_MEMBERS")) {
    let bicon = bot.user.displayAvatarURL;

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("**Kick**")
    .setDescription("Kicking...")
    .setColor("#ff0000")
    .setThumbnail(bicon)
    .addField(`${kickPerson.user.username} kickelve lett!`, "ˇˇˇˇ")
    .addField("Kickelte:", `${message.member} ezt az embert: ${kickPerson.user.username}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${name}`);

    message.guild.member(kickPerson.id).kick();
    message.channel.send(kickEmbed);
    console.log(`${message.author.id} kickelte ${kickPerson}!`);

    } else message.channel.send("A szerver adminjait nem tudod kickelni!");

    } else message.channel.send("Kérlek adj meg egy nevet! (pl: @asd)");

    } else message.channel.send("Neked nincs jogod hogy kickelj!");
} else message.reply("Ahhoz hogy ez a parancs sikeresen működjön ahhoz nekem administratornak kéne lennem. Kérlek add meg nekem az 'ADMINISTRATOR' jogot.")

}

if(cmd === `${prefix}ban`) {
    if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
    let kickPerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (kickPerson) {
    if (!kickPerson.hasPermission("KICK_MEMBERS")) {
    let bicon = bot.user.displayAvatarURL;

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("**Ban**")
    .setDescription("Ban hammer time!")
    .setColor("#ff0000")
    .setThumbnail(bicon)
    .addField(`${kickPerson.user.username} bannolva lett!`, "ˇˇˇˇ")
    .addField("Bannolta:", `${message.member} ezt az embert: ${kickPerson.user.username}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${name}`);

    message.guild.member(kickPerson.id).ban();
    message.channel.send(kickEmbed);
    console.log(`${message.author.id} bannolta: ${kickPerson}!`);

    } else message.channel.send("A szerver adminjait nem tudod bannolni!");

    } else message.channel.send("Kérlek adj meg egy nevet! (pl: @asd)");

    } else message.channel.send("Neked nincs jogod hogy bannolj!");
} else message.reply("Ahhoz hogy ez a parancs sikeresen működjön ahhoz nekem administratornak kéne lennem. Kérlek add meg nekem az 'ADMINISTRATOR' jogot.")

}



   
})

bot.login(process.env.BOT_TOKEN);
