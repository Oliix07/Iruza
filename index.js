const Discord = require("discord.js");
const token = require("./token.json");
const fs = require("fs");
const bdd = require("./bdd.json");

const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log("Le bot est allumé")
    bot.user.setStatus("dnd");
    setTimeout(() => {
        bot.user.setActivity("développer mon bot");
    }, 100)
});

bot.on("guildMemberAdd", member => {
    
    if(bdd["message-bienvenue"]){
        bot.channels.cache.get('722480791841407088').send(bdd["message-bienvenue"]);
    }
    else{
        bot.channels.cache.get('722480791841407088').send(`Bienvenue ${member.user} sur le serveur CHILL ||オタク`);
    }
    member.roles.add('721739047722025037');
})







    bot.on("guildMemberRemove", member => {
    
        if(bdd["message-aurevoir"]){
            bot.channels.cache.get('722480791841407088').send(bdd["message-aurevoir"]);
        }
        else{
            bot.channels.cache.get('722480791841407088').send(`${member.user} est partie ....`);
        }




})

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.content.startsWith("mr-clear")) {
        // message.delete();
        if (message.member.hasPermission('MANAGE_MESSAGES')) {

            let args = message.content.trim().split(/ +/g);

            if (args[1]) {
                if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {

                    message.channel.bulkDelete(args[1])
                    message.channel.send(`Vous avez supprimé ${args[1]} message(s)`)
                    message.channel.bulkDelete(1)

                }
                else {
                    message.channel.send(`Vous devez indiquer une valeur entre 1 et 99 !`)
                }
            }
            else {
                message.channel.send(`Vous devez indiquer un nombre de messages a supprimer !`)
            }
        }
        else {
            message.channel.send(`Vous devez avoir la permission de gérer les messages pour éxécuter cette commande !`)
        }
    }

    if (message.content.startsWith("mr-mb")) {
        message.delete()
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            if (message.content.length > 5) {
                message_bienvenue = message.content.slice(4)
                bdd["message-bienvenue"] = message_bienvenue
                Savebdd()

            }
        }
    }
    if (message.content.startsWith("mr-warn")) {
        if (message.member.hasPermission('BAN_MEMBERS')) {

            if (!message.mentions.users.first()) return;
            utilisateur = message.mentions.users.first().id

            if (bdd["warn"][utilisateur] == 2) {

                delete bdd["warn"][utilisateur]
                message.guild.members.ban(utilisateur)

            }
            else {
                if (!bdd["warn"][utilisateur]) {
                    bdd["warn"][utilisateur] = 1
                    Savebdd();
                    message.channel.send("Tu as a présent " + bdd["warn"][utilisateur] + " avertissement(s)");
                }
                else {
                    bdd["warn"][utilisateur]++
                    Savebdd();
                    message.channel.send("Tu as a présent " + bdd["warn"][utilisateur] + " avertissements");

                }
            }
        }
    }
    // commande de stats
    if (message.content.startsWith("mr-stats")) {
        let onlines = message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size;
        let totalmembers = message.guild.members.cache.size;
        let totalservers = bot.guilds.cache.size;
        let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;
        let totalrole = message.guild.roles.cache.get('721739047722025037').members.map(member => member.user.tag).length;

        const monembed = new Discord.MessageEmbed()
            .setColor('#FFFFFA')
            .setTitle('Statistiques')
            .setURL('https://discord.js.org/')
            .setAuthor('Projet LD Bot', 'https://cdn.discordapp.com/attachments/714068372475871252/718468731097055272/OIP.jpg', 'https://discord.js.org')
            .setDescription('Voici les statistiques du serveur :')
            .setThumbnail('https://cdn.discordapp.com/attachments/714068372475871252/718468731097055272/OIP.jpg')
            .addFields(
                { name: 'Nombre de membrs total', value: totalmembers, inline: true },
                { name: 'Membres connéctés : ', value: onlines, inline: true },
                { name: 'Nombre de serveurs auquel le bot appartient : ', value: totalservers, inline: true },
                { name: 'Nombres de bots sur le serveur : ', value: totalbots, inline: true },
                { name: 'Nombre d\'arrivants : ', value: totalrole, inline: true },
            )
            .setImage('https://cdn.discordapp.com/attachments/714068372475871252/718468731097055272/OIP.jpg')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://cdn.discordapp.com/attachments/714068372475871252/718468731097055272/OIP.jpg');

        message.channel.send(monembed);
    }



    bot.on("message", message => {
    if (message.content.startsWith("mr-help")) {
        let onlines = message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size;
        let totalmembers = message.guild.members.cache.size;
        let totalservers = bot.guilds.cache.size;
        let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;
        let totalrole = message.guild.roles.cache.get('721739047722025037').members.map(member => member.user.tag).length;

        const monembed = new Discord.MessageEmbed()
            .setColor('#FFFFFA')
            .setTitle('Help')
            .setURL('https://discord.js.org/')
            .setAuthor('Projet LD Bot', 'https://cdn.discordapp.com/attachments/714068372475871252/718468731097055272/OIP.jpg', 'https://discord.js.org')
            .setDescription('**Voici les commandes :** \n\n mr-clear + nombre\n mr-warn + ping\n mr-rank\n mr-stats\n mr-mb\n mr-avatar')
            .setThumbnail('https://cdn.discordapp.com/attachments/714068372475871252/718468731097055272/OIP.jpg')
            .setImage('https://cdn.discordapp.com/attachments/714068372475871252/722374409633005649/chill.png')
            .setTimestamp()
            .setFooter('passez du bon moment ici avec nous !', 'https://cdn.discordapp.com/attachments/714068372475871252/722374409633005649/chill.png');

        message.channel.send(monembed);
    }
    });



    if (message.content.startsWith("mr-vent")) {
        let onlines = message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size;
        let totalmembers = message.guild.members.cache.size;
        let totalservers = bot.guilds.cache.size;
        let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;
        let totalrole = message.guild.roles.cache.get('721739047722025037').members.map(member => member.user.tag).length;

    const monembed = new Discord.MessageEmbed()
    .setColor('#FFFFFA')
    .setTitle('tu m\'a mis un vent')
    .setURL('https://discord.js.org/')

message.channel.send(monembed);
}


    //LEVEL

    if (message.content.startsWith('mr-lvl')) {
        if (bdd["statut-level"] == true) {
            bdd["statut-level"] = false
            Savebdd();
            return message.channel.send('Vous venez d\'arreter le système de level !');
        }
        else {
            bdd["statut-level"] = true;
            Savebdd();
            return message.channel.send('Vous venez d\'allumer le système de level !');
        }
    }

    if (bdd["statut-level"] == true) {
        if (message.content.startsWith('mr-rank')) {
            if (!bdd["coins-utilisateurs"][message.member.id]){
                return message.channel.send(`Nous n'avez pas encore posté de message !`);
            } else {
                return message.channel.send(`Vous avez ${bdd["coins-utilisateurs"][message.member.id]} points !\nEt vous êtes au level n°${bdd["level-utilisateurs"][message.member.id]}`)
            }
        }
        else{
            addRandomInt(message.member);
            if (!bdd["coins-utilisateurs"][message.member.id]) {
                bdd["coins-utilisateurs"][message.member.id] = Math.floor(Math.random() * (4 - 1) + 1);
                bdd["level-utilisateurs"][message.member.id] = 0;
                Savebdd();
            }
            else if (bdd["coins-utilisateurs"][message.member.id] > 100 && bdd["coins-utilisateurs"][message.member.id] < 250) {
                if (bdd["level-utilisateurs"][message.member.id] == 0) {
                    bdd["level-utilisateurs"][message.member.id] = 1;
                    Savebdd();
                    return message.channel.send(`Bravo ${message.author} tu es passé niveau 1 !`);
                }
            }
            else if (bdd["coins-utilisateurs"][message.member.id] > 250 && bdd["coins-utilisateurs"][message.member.id] < 500) {
                if (bdd["level-utilisateurs"][message.member.id] == 1) {
                    bdd["level-utilisateurs"][message.member.id] = 2;
                    Savebdd();
                    return message.channel.send(`Bravo ${message.author} tu es passé niveau 2 !`);
                }
            }
            else if (bdd["coins-utilisateurs"][message.member.id] > 500 && bdd["coins-utilisateurs"][message.member.id] < 1000) {
                if (bdd["level-utilisateurs"][message.member.id] == 2) {
                    bdd["level-utilisateurs"][message.member.id] = 3;
                    Savebdd();
                    return message.channel.send(`Bravo ${message.author} tu es passé niveau 3 !`);
                }
            }
            else if (bdd["coins-utilisateurs"][message.member.id] > 1000) {
                if (bdd["level-utilisateurs"][message.member.id] == 3) {
                    bdd["level-utilisateurs"][message.member.id] = 4;
                    Savebdd();
                    return message.channel.send(`Bravo ${message.author} tu es passé niveau 4 !`);
                }
            }
        }
    }
    
})
function addRandomInt(member) {
    bdd["coins-utilisateurs"][member.id] = bdd["coins-utilisateurs"][member.id] + Math.floor(Math.random() * (4 - 1) + 1);
    Savebdd();
}

function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
  }

  /*bot.on("message", message => {
    if(message.content.startsWith("mr-help"))
    message.channel.send(`>    ===HELP===   \n> \n> Prefix : ***mr-*** \n> \n> ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n> \n> Commandes : \n> \n> 1) mr-clear + nombres \n> 2) mr-warn + ping (3 warns = ban pendant 1 jour)\n> 3) mr-rank\n> 4) mr-stats\n> 5) mr-mb  (juste pour mon developpeur)\n> 6 ??) une autre que je ne vous dirais pas !  .___.`)
})*/


bot.on("message", message => {
    if(message.content.startsWith("mr-tg"))
    message.channel.send(`Ta Gueule.... C'est pas toi qui décide enfaite !!`)
})

bot.on("message", message => {
    if(message.content.startsWith("mr-createur"))
    message.channel.send(`Mon créateur est @Oliix#0723 (votre maître a tous)`)
})


/*bot.on("message", message => {
    if(message.content.startsWith("mr-vent"))
    message.channel.send(`tu es méchant tu m'as mis un vent !!`)
});*/

bot.on("message", message => {
    if (message.content.startsWith("mr-avatar")) {
    
        let mentionedUser = message.mentions.users.first() || message.author
        let embedavatar = new Discord.MessageEmbed()
    
        embedavatar.setColor('#FFFFFA')
        embedavatar.setTitle(`Magnifique !`)
        embedavatar.setFooter(`Avatar de ${mentionedUser.tag}`)
        embedavatar.setURL(mentionedUser.displayAvatarURL({size: 2048}))
        embedavatar.setImage(mentionedUser.displayAvatarURL({size: 2048}))
    
        message.channel.send(embedavatar)
    }
    });




bot.login(token.token);

