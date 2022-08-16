const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { addKarma } = require('../mongoose.js');
const { errorEmbed } = require('../utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_karma')
		.setDescription('Добавить карму')
        .addUserOption(option =>
            option.setName('пользователь')
                .setDescription('Пользователь которого вы хотите добавить карму')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('карма')
                .setDescription('Карма которую вы хотите добавить')
                .setRequired(true))
        .setDefaultMemberPermissions(8),

	async execute(interaction) {
        const user = interaction.options.getUser('пользователь');
        const karma = interaction.options.getInteger('карма');
        const addKarmaEmbed = new MessageEmbed()
            .setTitle(`Пользователь ${user.username} получил ${karma} кармы(-а)`)
            .setColor('GREEN')
            .setTimestamp()
            .setFooter({ text: 'Добавить Карму | Карма' });
        try {
            await addKarma(user, karma, interaction);
            await interaction.reply({ embeds: [addKarmaEmbed] });
        }
        catch (error) {
            await interaction.reply({ embeds: [errorEmbed(error)] });
            console.log(error);
        }
	},
};