const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
}; 

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
}

client.on("guildMemberAdd", async member => {

    member.send("Merhaba aşkım! :heart: İyi günler. :blush: :heart:");
	member.send("Seni :hibiscus: **ƓЄȻЄ** Krallığına davet ediyorum,beni kırmayıp gelirmisin?");
	member.send("https://discord.gg/7ZhhgKj");

});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'tag') {
    msg.reply('**Tagımız = ƓЄȻЄ **');
  }
});

client.on('guildMemberAdd', member => {
  member.addRole(member.guild.roles.find(r => r.name.startsWith('')));
  const channel = member.guild.channels.find('name', 'giden-gelen');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
 .setTitle('Üye katıldı')
 .setDescRIPtion(`Sunucuya katıldı Hoşgeldin Bro${member.guild.memberCount} üye]!`)
 .setFooter('RIP', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'amk') {
    msg.reply('Sana Küfür Etmeni Kim Söyledi Bilmiyormusun **Yasak**!');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Amk') {
    msg.reply('Sana Küfür Etmeni Kim Söyledi Bilmiyormusun **Yasak**!');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'AMK') {
    msg.reply('Küfür Etmek **Yasaktır**');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'aMK') {
    msg.reply('Küfür Etmek Yasaktır Deneme Boşuna  !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oc') {
    msg.reply('Küfür Etmek Yasaktır RIP !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Oc') {
    msg.reply('Küfür Etmek Yasaktır RIP !');
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().includes('oc')) msg.reply('**Yazık Küfür Etmek Çok Kötü Birşey !**');
  if (msg.content.toLowerCase().includes('oruspu')) msg.reply('**Küfür Etmek Yasaktır RIP !**');
  if (msg.content.toLowerCase().includes('pic')) msg.reply('**Küfür Etmek Yasaktır RIP !**');
  if (msg.content.toLowerCase().includes('mk')) msg.reply('**Küfür Etmek Yasaktır RIP 👎 !**');
  if (msg.content.toLowerCase().includes('anan')) msg.reply('**Küfür Etmek Yasaktır RIP  !**');
  if (msg.content.toLowerCase().includes('yarram')) msg.reply('**Küfür Etmek Yasaktır RIP !**');
  if (msg.content.toLowerCase().includes('yarrak')) msg.reply('**YYasaklanmış Mesaj Küfür Yasaktır RIP!**');
  if (msg.content.toLowerCase().includes('amk')) msg.reply('**Küfür Etmek Yasaktır RIP !**');
  if (msg.content.toLowerCase().includes('top')) msg.reply('**Küfür Etmek Yasaktır RIP!**');
  msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oç') {
    msg.reply('Küfür Etmek Yasaktır RIP !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Oç') {
    msg.reply('Küfür Etmek Yasaktır RIP!');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'OC') {
    msg.reply('Küfür Etmek Yasaktır RIP!');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'OÇ') {
    msg.reply('Küfür Etmek Yasaktır RIP !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'pic') {
    msg.reply('Küfür Etmek Yasaktır RIP !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'piç') {
    msg.reply('Küfür Etmek Yasaktır RIP !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Pic') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Piç') {
    msg.reply('Küfür Etmek Yasaktır RIP !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'PİC') {
    msg.reply('Küfür Etmek Yasaktır RIP !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'PİÇ') {
    msg.reply('Küfür Etmek Yasaktır RIP !');
	msg.react('🖕')
	msg.delete();
  }
});


client.on('message', msg => {
if (msg.content.toLowerCase() === 'sigara') {
msg.channel.send(':smoking: :cloud::cloud::cloud:')
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'));
}
});


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
