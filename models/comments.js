const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: { type: String, require: true, minlength: 2, maxlength: 1000 },
    likes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
    createdAt: "publishedAt",
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
