const { userSchema } = require('./schemas/user-schema.js');
const { dblink } = require('./json/config.json');
const mongoose = require('mongoose');

mongoose.connect(dblink);

function toModel(name, schema) {
	return mongoose.model(name, schema);
}

async function insertNew(model, data, collection) {
	const newModel = new model(data, collection);
	return await newModel.save();
}

async function createUser(user) {
	const userModel = toModel('user', userSchema);
	const userData = await userModel.findOne({ id: new mongoose.Types.Decimal128(user.id) });
	if (userData) {
		return userData;
	} else {
		const newUser = {
			name: user.username || user.displayName || user,
			id: new mongoose.Types.Decimal128(user.id),
		}
		return await insertNew(userModel, newUser);
	}
}

async function addKarma(user, amount) {
	const userModel = toModel('user', userSchema);
	const userData = await createUser(user);
	userData.karma += amount;
	await userModel.findOneAndUpdate({ id: new mongoose.Types.Decimal128(user.id) }, { $set: { karma: userData.karma } });
}

async function setKarmaTime(user, time) {
	const userModel = toModel('user', userSchema);
	const userData = await createUser(user);
	userData.karmaTime = time;
	await userModel.findOneAndUpdate({ id: new mongoose.Types.Decimal128(user.id) }, { $set: { karmaTime: userData.karmaTime } });
}

async function setKarmaGiven(user, amount) {
	const userModel = toModel('user', userSchema);
	const userData = await createUser(user);
	userData.karmaGiven += amount;
	await userModel.findOneAndUpdate({ id: new mongoose.Types.Decimal128(user.id) }, { $set: { karmaGiven: userData.karmaGiven } });
}

module.exports = { createUser, addKarma, setKarmaTime, setKarmaGiven };