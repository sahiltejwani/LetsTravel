let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    id: String,
    title: String,
    date: Date,
    description: String,
    text: String,
    country: String,
    imageURL: String
});

let Post = mongoose.model('Post', postSchema);// basically create dthe class on which the operation to be performed

module.exports = {
    Post: Post
}