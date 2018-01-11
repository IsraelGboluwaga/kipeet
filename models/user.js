const mongoose = require('mongoose');
const Schema = mongoose.schema;
const uniqueValidator = require('mongoose-unique-validator');


let userModel = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: false},
    phone: {type: Number, required: false},
    task: {type: Schema.Types.ObjectId, ref: 'Task'}
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userModel);