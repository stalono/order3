const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { addKarma, setKarmaTime, setKarmaGiven, createUser } = require('../mongoose.js');
const { errorEmbed } = require('../utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give_karma')
		.setDescription('Добавить карму')
        .addUserOption(option =>
            option.setName('пользователь')
                .setDescription('Пользователь которого вы хотите добавить карму')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('количество')
                .setDescription('Количество кармы которую вы хотите добавить пользователю')
                .setRequired(true)
                .addChoices(
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                )),
	async execute(interaction) {
        const user = interaction.options.getUser('пользователь');
        const karma = interaction.options.getString('количество');
        const addKarmaEmbed = new MessageEmbed()
            .setTitle(`Вы успешно добавили пользователю ${user.username} ${karma} кармы(-а)`)
            .setColor('DARK_GREEN')
            .setTimestamp()
            .setFooter({ text: 'Добавить Карму' });
        const userData = await createUser(interaction.user);
        const karmaTime = userData.karmaTime; 
        if (Date.now() - karmaTime < 86400000 || user === interaction.user) { 
            const errorEmbed = new MessageEmbed()
                .setTitle('Карму можно выдавать раз в 24 часа')
                .setColor('DARK_RED')
                .setTimestamp()
                .setFooter({ text: 'Добавить Карму' });
            await interaction.reply({ embeds: [errorEmbed] });
            return;
        }
        try {
            await addKarma(user, Number(karma), interaction);
            await setKarmaTime(interaction.user, Date.now());
            await setKarmaGiven(interaction.user, Number(karma));
            await interaction.reply({ embeds: [addKarmaEmbed] });
        }
        catch (error) {
            await interaction.reply({ embeds: [errorEmbed(error)] });
            console.log(error);
        }
	},
};