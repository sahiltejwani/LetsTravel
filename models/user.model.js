let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: String,
    password: String
});

let User = mongoose.model('User', userSchema);// basically create dthe class on which the operation to be performed

module.exports = {
    User: User
}