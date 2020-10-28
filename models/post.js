const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // comment model
    },
  ],
  caption: String,
  image: String,
  created_at: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // User model
  },
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
