const { mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    id: mongoose.Types.Decimal128,
    karma: {
        type: Number,
        default: 0,
    },
    karmaTime: {
        type: Number,
        default: 0,
    },
    karmaGiven: {
        type: Number,
        default: 0,
    }
});

module.exports = { userSchema };