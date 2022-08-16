const { syncCommands } = require('../deploy-commands.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity('/help', { type: 'LISTENING' });
		console.log(`Готово!`);
        syncCommands();
	},
};