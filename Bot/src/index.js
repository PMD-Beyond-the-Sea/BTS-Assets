require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, Colors, TextChannel } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
});

/*client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === 'b!roll') {
        message.reply('roll command found');
    }
});*/

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'roll') {
        const diceNum = interaction.options.get('d').value;
        var rollResult = Math.floor(Math.random() * (diceNum - 1)) + 1;

        const rollEmbed = new EmbedBuilder()
            .setTitle('🎲 Rolling dice!')
            .setDescription(`[**d${diceNum}** : ${rollResult}]\nYou rolled a **${rollResult}**!`)
            .setColor(Colors.DarkGold);

        interaction.reply({ embeds: [rollEmbed] });
    }

    if (interaction.commandName === 'choose') {
        var list = interaction.options.get('options').value;
        var listArray = [];

        if (list.includes("|")) {
            listArray = list.split("|");
        } else if (list.includes(",")) {
            listArray = list.split(",");
        }
        
        const select = interaction.options.get('select')?.value === undefined ? 1 : interaction.options.get('select')?.value;

        const chooseEmbed = new EmbedBuilder()
            .setTitle('🏆 Choosing...')
            .setDescription(`Selected **${select}** result${select > 1 ? 's' : ''}:\n>>> ${chooseFromList(randomNumbers(listArray, select), listArray)}`)
            .setColor(Colors.DarkGold);

        interaction.reply(
            {
                content: `-# Choosing from the following options:\n> -# ${listArray.toString().replaceAll(" , ", ", ")}\n⠀`,
                embeds: [chooseEmbed]
            }
        );
    }
});

function randomNumbers(listArray, select) {
    var arr = [];
    while (arr.length < select) {
        var r = Math.floor(Math.random() * listArray.length);
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    console.log(arr);
    return arr;
}

function chooseFromList(indexArray, listArray) {
    var selected = '';
    for (var i = 0; i < indexArray.length; i++) {
        selected += `\`\`${i + 1}\`\` : ${listArray[indexArray[i]]}${i === indexArray.length - 1 ? '' : '\n'}`;
    }

    return selected.replaceAll('  ', ' ');
}

client.login(process.env.TOKEN);