const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { createUser } = require('../mongoose.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('karma')
		.setDescription('Посмотреть карму игрока')
        .addUserOption(option =>
            option.setName('пользователь')
                .setDescription('Пользователь карму которого вы хотите посмотреть')
                .setRequired(false)),

	async execute(interaction) {
        const user = interaction.options.getUser('пользователь') || interaction.user;
        const userData = await createUser(user);
        const karma = userData.karma || 0;
        const karmaGiven = userData.karmaGiven || 0;
        const karmaTime = userData.karmaTime || 0;
        const hours = karmaTime > 0 ? Math.floor((Date.now() - karmaTime) / 3600000) : 0;
        const hoursString = `${hours} часа(-ов)`;
        const karmaTimeString = `${hoursString} назад`;
        const karmaEmbed = new MessageEmbed()
            .setTitle(`Информация о пользователе ${user.username}`)
            .setDescription(`- Карма: ${karma}\n- Отправил кармы: ${karmaGiven}\n- Отправлял карму: ${karmaTimeString}`)
            .setColor('DARK_GREEN')
            .setTimestamp()
            .setFooter({ text: 'Карма' });
        try {
            await interaction.reply({ embeds: [karmaEmbed] });
        }
        catch (error) {
            await interaction.reply({ embeds: [errorEmbed(error)] });
            console.log(error);
        }
    }
};