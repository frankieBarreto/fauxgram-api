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

const show = (req, res) => {
  db.Post.findById(req.body, (err, foundPost) => {
    if (err) console.log("Error in post#show:", err);

    // if (!foundPost) return res.status(200).json({"message": "No post with that id found in db"});

    res.status(200).json({ post: foundPost });
  });
};

const create = (req, res) => {
  let userId = req.userId;

  db.Post.create(req.body, (err, createdPost) => {
    if (err) console.log("Error in post#create:", err);
    // db.User.findById(userId)
    createdPost.user = userId;
    createdPost.save();
    res.status(201).json({ post: createdPost });
  });
};

const update = (req, res) => {
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

// TODO MAKE SURE THE COMMENTS AND ID IS ALSO DELETED
const destroy = (req, res) => {

  let comments = db.Post.comments;

  db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
    if (err) console.log("Error in post#destroy:", err);

    // if(!deletedPost) return res.status(200).json({ "message": "No post with that id found in db" });
    // for (let i = 0; i < deletedPost.comments.length; i++) {
    //   let comment = deletedPost.comments[i] = comment;
    //   comment.findByIdAndDelete(req.params.id)
    // }
    res.status(200).json({ post: deletedPost });
  });
  
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
