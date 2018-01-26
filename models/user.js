const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let userModel = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    task: {type: Schema.Types.ObjectId, ref: 'Task'}
});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('User', userModel);