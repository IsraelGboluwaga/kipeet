const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskModel = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    task: {type: String, required: true}
});

module.exports = mongoose.model('Task', taskModel);