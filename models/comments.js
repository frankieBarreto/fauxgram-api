const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: { type: String, require: true, minlength: 2, maxlength: 1000 },
    votes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.Objects, ref: "User" },
    post: { type: mongoose.Schema.Types.Objects, ref: "Post" },
    comment: { type: mongoose.Schema.Types.Objects, ref: "Comment" },
  },
  {
    timestamps: true,
    createdAt: "publishedAt",
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
