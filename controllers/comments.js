const db = require("../models");

const index = (req, res) => {
  db.Comment.find({})
    .populate("user")
    .exec((err, foundComments) => {
      if (err) console.log("Error in comments#index:", err);

      res.status(200).json({ comment: foundComments });
    });
};

const show = (req, res) => {
  db.Comment.findById(req.body, (err, foundComment) => {
    if (err) console.log("Error in comment#show:", err);

    res.status(200).json({ comment: foundComment });
  });
};

const create = async (req, res) => {
  let userId = req.userId;
  let user = await db.User.findById(userId)
  console.log(req, "************************", user)
  db.Comment.create(req.body, (err, createdComment) => {
      if (err) return console.log("Error in comment#create:", err);
      user.comments.push(createdComment.id);
      createdComment.user = userId;
      user.save();
      createdComment.save();

      db.Post.findById(createdComment.post, (err, foundPost)=>{
          if(err) return console.log("Error in comment/post#create:",err)
          foundPost.comments.push(createdComment)
          foundPost.save()
          res.status(201).json({ comment: createdComment });
      })
  });
};

const update = (req, res) => {
  db.Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedComment) => {
      if (err) console.log("Error in comment#update:", err);

      res.status(200).json({ comment: updatedComment });
    }
  );
};

//TODO make sure once post is deleted comments are also removed
// delGame.dev.forEach(async (dev) => {
//   const temp = await db.Dev.findById(dev);
//   temp.games.remove(delGame);
//   temp.save();
// })
const destroy = async (req, res) => {
  let user = await db.User.findById(req.userId);



  
  
  
  db.Comment.findByIdAndDelete(req.params.id, (err, deletedComment) => {
    if (err) console.log("Error in comment#destroy:", err);
    user.comments.remove(deletedComment.id)
    user.save()
    res.status(200).json({ comment: deletedComment });
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
