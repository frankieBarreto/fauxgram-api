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
  // req.params.is to show single post
  db.Post.findById(req.params.id)
    .populate("user comments")
    .exec((err, foundPost) => {
      if (err) console.log("Error in post#show:", err);

      res.status(200).json({ post: foundPost });
    });
};

const create = async (req, res) => {
  console.log(req);
  let userId = req.userId;
  let user = await db.User.findById(userId);

  db.Post.create(req.body, (err, createdPost) => {
    if (err) console.log("Error in post#create:", err);

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

// TODO MAKE SURE THE COMMENTS AND ID IS ALSO DELETED
const destroy = async (req, res) => {
  const foundPost = await db.Post.findById(req.params.id).populate({
    path: "comments",
    populate: {
      path: "user",
      model: "User",
    },
  });
  const user = await db.User.findById(req.userId);
  user.posts.remove(foundPost.id);
  user.save();
  // const foundComment = db.Comment.findById(foundPost.comments)
  // const foundComments = db.Comment.find({post: foundPost.id})

  const arr = foundPost.comments;

  for (var i in arr) {
    let comment = arr[i];
    comment.user.comments.remove(comment)
    comment.user.save()
    await db.Comment.findByIdAndDelete(comment);
  }

  // console.log("----------------------------------------------",foundComments)
  // console.log("-->foundPost-->",foundPost);
  // const foundUser = await db.User.findById(foundPost.user);
  // console.log("-->foundUser-->",foundUser);
  // foundUser.remove(foundPost)
  // foundComment.remove(foundPost)

  await db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
    if (err) console.log(`Error in post#destroy: `, err);
    console.log(deletedPost);
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
