const db = require("../models");

const index = (req, res) => {
  db.Post.find({})
    .populate("user")
    .exec((err, foundPosts) => {
      if (err) console.log("Error in post#index:", err);

      // if(!foundPost.length) return res.status(200).json({"message": "No post found in db"});

      res.status(200).json({ post: foundPosts });
    });
};

const show = (req, res) => {
  db.Post.create(req.body, (err, foundPost) => {
    if (err) console.log("Error in post#show:", err);

    // if (!foundPost) return res.status(200).json({"message": "No post with that id found in db"});

    res.status(200).json({ post: foundPost });
  });
};

const create = (req, res) => {
  const userId = req.user_id;
  db.Post.create(req.body, (err, createdPost) => {
    if (err) console.log("Error in post#create:", err);
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

      // if(!updatedPost) return res.status(200).json({ "message": "No post with that id found in db" });

      res.status(200).json({ post: updatedPost });
    }
  );
};

const destroy = (req, res) => {
  db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
    if (err) console.log("Error in post#destroy:", err);

    // if(!deletedPost) return res.status(200).json({ "message": "No post with that id found in db" });

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
