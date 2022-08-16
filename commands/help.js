const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Помощь по боту'),
	async execute(interaction) {
        const helpEmbed = new MessageEmbed()
            .setTitle('Карма есть у каждого и влияет на доверенность к человеку')
            .setDescription(
            '**Каждый игрок может подарить другому карму раз в сутки**\n'+
            '**/karma - информация о карме пользователя**\n'+
            '**/give_karma - подарить карму пользователю**')
            .setColor('DARK_RED')
            .setTimestamp()
            .setFooter({ text: 'Бот создан специально для reShop' });
        await interaction.reply({ embeds: [helpEmbed] });
	},
};