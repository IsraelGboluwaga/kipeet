const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let taskModel = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    task: {type: String, required: true}
});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('Task', taskModel);