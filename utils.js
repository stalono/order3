const { MessageEmbed } = require('discord.js');

function errorEmbed(error) {
    return new MessageEmbed()
    .setTitle('Ошибка')
    .setDescription(`**${error}**`)
    .setColor('RED')
    .setTimestamp()
    .setFooter({ text: 'Ошибка | Карма' });
}

async function sendDM(interaction, embed, id) {
    const user = await interaction.guild.members.cache.get(id);
    const dm = await user.createDM();
    await dm.send({embeds: [embed]});
    await user.deleteDM();
}

module.exports = { errorEmbed, sendDM };