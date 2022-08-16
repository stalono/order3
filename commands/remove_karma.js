const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { addKarma } = require('../mongoose.js');
const { errorEmbed } = require('../utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_karma')
		.setDescription('Отнять карму')
        .addUserOption(option =>
            option.setName('пользователь')
                .setDescription('Пользователь у которого вы хотите отнять карму')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('карма')
                .setDescription('Карма которую вы хотите отнять')
                .setRequired(true))
        .setDefaultMemberPermissions(8),

	async execute(interaction) {
        const user = interaction.options.getUser('пользователь');
        const karma = interaction.options.getInteger('карма');
        const removeKarmaEmbed = new MessageEmbed()
            .setTitle(`У пользователя ${user.username} было отнято ${karma} кармы(-а) пользователем ${interaction.user.username}`)
            .setColor('DARK_RED')
            .setTimestamp()
            .setFooter({ text: 'Отнять Карму | Карма' });
        try {
            await addKarma(user, karma * -1, interaction);
            await interaction.reply({ embeds: [removeKarmaEmbed] });
        }
        catch (error) {
            await interaction.reply({ embeds: [errorEmbed(error)] });
            console.log(error);
        }
	},
};