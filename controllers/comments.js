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

const create = (req, res) => {
  let userId = req.userId;
  db.Comment.create(req.body, (err, createdComment) => {
      if (err) return console.log("Error in comment#create:", err);
      
      createdComment.user = userId;
      createdComment.save();
      // find the post id and push the model into the comments array
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
const destroy = (req, res) => {
  db.Comment.findByIdAndDelete(req.params.id, (err, deletedComment) => {
    if (err) console.log("Error in comment#destroy:", err);

    // if(!deletedComment) return res.status(200).json({ "message": "No comment with that id found in db" });

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
