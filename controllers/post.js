const { Post } = require("../models");
const db = require("../models");

const index = (req, res) => {
  db.Post.find({})
    .populate("user comments")
    .exec((err, foundPosts) => {
      if (err) console.log("Error in post#index:", err);

      // if(!foundPost.length) return res.status(200).json({"message": "No post found in db"});

      res.status(200).json({ post: foundPosts });
    });
};

const user = (req, res) => {
  db.Post.find({user: req.params.id})
    .exec((err, userPosts) => {
      if (err) console.log("Error in post#index:", err);

      res.status(200).json({ post: userPosts });
    });
};

const show = (req, res) => {

  db.Post.findById(req.params.id)
    .populate("user comments")
    .exec((err, foundPost) => {
      if (err) console.log("Error in post#show:", err);

      res.status(200).json({ post: foundPost });
    });
};

const create = async (req, res) => {
  let userId = req.userId;
  let user = await db.User.findById(userId);

  db.Post.create(req.body, (err, createdPost) => {
    if (err) console.log("Error in post#create:", err);
    console.log("----------->",req.body);
    user.posts.push(createdPost.id);
    user.save();
    createdPost.user = userId;
    createdPost.save();
    res.status(201).json({ post: createdPost });
  });
};

const update = (req, res) => {
  console.log(req.params.id, req.body);
  db.Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPost) => {
      if (err) console.log("Error in posts#update:", err);

      res.status(200).json({ post: updatedPost });
    }
  );
};

const destroy = async (req, res) => {
  try {
    const deletedPost = await db.Post.findByIdAndDelete(req.params.id);
    const foundUser = await db.User.findById(deletedPost.user);
    foundUser.posts.remove(deletedPost);
    foundUser.save();
    console.log(deletedPost)
    // const deletedComments = db.Comment.deleteMany({ post: deletedPost._id });
    
    res.status(200).json({
      data:deletedPost
    })
  } catch (err) {
    return console.log(err);
  }
};

module.exports = {
  index,
  show,
  user,
  create,
  update,
  destroy,
};
