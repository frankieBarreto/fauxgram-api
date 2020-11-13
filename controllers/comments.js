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

    res.status(200).json({ "comment": foundComment });
  });
};

const create = async (req, res) => {
  let userId = req.userId;
  let user = await db.User.findById(userId)
  db.Comment.create(req.body, (err, createdComment) => {
      if (err) return console.log("Error in comment#create:", err);
      console.log("from creatComments-api:", createdComment)
      user.comments.push(createdComment.id);
      createdComment.user = userId;
      user.save();
      createdComment.save();
      
      db.Post.findById(createdComment.post, (err, foundPost)=>{
        if(err) return console.log("Error in comment/post#create:",err)
        console.log("2from creatComments-api:", foundPost)
          // foundPost.comments.push(createdComment)
          // foundPost.save()
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


const destroy = async (req, res) => {
  try {
    let deletedComment = await db.Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: deletedComment
    })
  } catch(err) {
    return console.log(err)
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
