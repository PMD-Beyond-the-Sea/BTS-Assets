require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'roll',
        description: 'Rolls a dice.',
        options: [
            {
                name: 'd',
                description: 'Number of sides the dice has (i.e. maximum number it can roll).',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
        name: 'choose',
        description: 'Chooses randomly from a list.',
        options: [
            {
                name: 'options',
                description: 'A list of options to select from. All must be separated by \`\`|\`\` or \`\`,\`\`!',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'select',
                description: 'How many options should be selected. Default is 1.',
                type: ApplicationCommandOptionType.Number,
                required: false,
            }
        ]
    }
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Slash commands were registered successfully!');
    } catch (err) {
        console.log(`An error has occurred: ${err}`);
    }
})();