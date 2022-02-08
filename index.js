// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const { MessageEmbed } = require('discord.js');

// Create a new client instance
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]   
});

// Arrays for 'random' commands
const voiceOvers = [
    'Every journey has its final day. Don\'t rush.',
    'Boats are made for transferring commodities back and forth, and those that come across Liyue tend to stay a while, so it is where many things come to settle.',
    'Osmanthus wine tastes the same as I remember... But where are those who share the memory?',
    'Violetgrass is a plant that enjoys a moist environment and is best picked after it rains. If you should choose to pick any, be sure to store them appropriately.',
    'I hope today too shall be prosperous.',
    'Want a quick meal to pick us back up? I know a good place in Chihu Rock.',
    'Nothing can be accomplished without rules or standards. No matter if it is mortals or adepti, everyone has their place. This rule keeps Liyue in peace.',
    'I will have order!',
    'You and I have a contract, so feel free to discuss anything at all within the scope of said contract.',
    'If you\'re heading to Jueyun Karst, please bring me back a bunch of Qingxin. Just one bunch is enough. Travel expenses... Ah, I almost forgot, during the effective period of our contract, travel expenses are to be paid for by yourself. Sorry to bother you.'
  ];

const botStatus = [
    'd-do you like my nerd cube?',
    'childe\'s wallet',
    'Genshin Impact'
];

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

    const randomStatus = Math.floor(Math.random() * voiceOvers.length);
    client.user.setActivity(botStatus[randomStatus], {type: 'PLAYING'});
});

// Simple message commands: 
// zhongli quote, childe, venti, xiao, ningguang, slap
client.on('messageCreate', (msg) => {
    if (msg.content === 'zhongli quote') {
        const randomQuote = Math.floor(Math.random() * voiceOvers.length);
        msg.channel.send(voiceOvers[randomQuote]);
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase().includes('childe')) {
        msg.channel.send('That rascal from Snezhnaya? 😳');
    } else if (msg.content.toLowerCase().includes('venti')) {
        msg.channel.send('That bard has just been through here, hasn\'t he?');
    } else if (msg.content.toLowerCase().includes('xiao')) {
        msg.channel.send('*sigh* Still fulfilling his duty to this very day.');
    } else if (msg.content.toLowerCase().includes('ningguang')) {
        msg.channel.send('She always continues to press on. A rare gem indeed.');
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content.includes('zhongli slap')) {
        const userSlapped = msg.mentions.users.first();
        if(userSlapped){
            let slapEmbed = new MessageEmbed()
                .setTitle(`${msg.author.username} slapped ${userSlapped.username} :sob:`)
                .setImage('https://c.tenor.com/NrEbwr78DjAAAAAC/zhongli-kick-zhongli.gif')
                .setTimestamp()
            msg.channel.send({ embeds: [slapEmbed] });
        } else if (msg.content === 'zhongli slap') {
            msg.channel.send('ow');
        } else {
            msg.channel.send(`Sorry ${msg.author} that user is not in this server!`);
        }
    }
});

// Simple reactions
client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase().includes('hot')) {
      msg.react('🥵');
    }
    if (msg.content.toLowerCase().includes('spicy')) {
      msg.react('😳');
    }
});

// Advanced commands
client.on('messageCreate', (msg) => {
    if (msg.content.includes('zhongli pick')) {
      const sentence = msg.content;
      const words = sentence.split(' ');
  
      words.splice(0, 1);
      words.splice(0, 1);
      let orIndex = words.indexOf('or');
      words.splice(orIndex, 1);
  
      const randomPick = Math.floor(Math.random() * words.length);
      msg.channel.send(`I would pick ${words[randomPick]}!`)
    }
  }); 
  
client.on('messageCreate', (msg) => {
    if (msg.content === 'zhongli help') {
      const exampleEmbed = new MessageEmbed()
        .setColor('#e8c660')
        .setTitle('Singing Zhongli Commands')
        .setURL('https://www.youtube.com/watch?v=4oBpaBEMBIM')
        .setAuthor({ name: 'Geo Archon (or smth)', iconURL: 'https://cdn141.picsart.com/355711199030211.png', url: 'https://www.youtube.com/watch?v=4oBpaBEMBIM' })
        .setDescription('Where do you want to go next? If you\'d like to see Liyue\'s tourist spots, I have a few references.')
        .setThumbnail('https://c.tenor.com/K1jIPS7dAp4AAAAC/zhongli.gif')
        .addFields(
          // { name: 'Regular field title', value: 'Some value here' },
          // you can add an empty field for space if you want owo
          { name: 'zhongli quote', value: 'listen to some wisdom from zhongli', inline: true },
          { name: 'zhongli slap/zhongli slap @user', value: 'for when you really want to slap someone', inline: true },
          { name: 'zhongli play', value: 'play some music in a voice channel', inline: true },
          { name: 'zhongli stop', value: 'stop music in voice channel', inline: true },
        )
        .addFields(
          { name: 'zhongli pick A or B', value: 'zhongli helps to make wise decisions', inline: true },
          { name: 'zhongli defeat', value: 'your favourite archon defeats your enemies', inline: true }
          )
        .setImage('https://i0.wp.com/i.makeagif.com/media/7-17-2021/DnHA5A.gif')
        .setTimestamp()
        .setFooter({ text: 'Ha, this is getting interesting 😳', iconURL: 'https://static.wikia.nocookie.net/gensin-impact/images/9/9f/Item_Flower_of_Creviced_Cliff.png/revision/latest?cb=20201120064841' });
  
    msg.channel.send({ embeds: [exampleEmbed] });
      }
  });

// Login to Discord with your client's token
client.login(token);