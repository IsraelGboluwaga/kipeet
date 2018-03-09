const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskModel = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, default: 'My Title', required: true},
    body: {type: String, required: true},
    created_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Task', taskModel);