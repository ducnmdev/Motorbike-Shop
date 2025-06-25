const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-updater')
// mongoose.plugin(slug);

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);
module.exports = User;