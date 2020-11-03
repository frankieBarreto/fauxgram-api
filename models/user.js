const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    profileImg: {
      type: String,
      require: false,
      unique: false,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    comments:[{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
  },
  {
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (doc, ret, opt) => {
    delete ret["password"];
    return ret;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
