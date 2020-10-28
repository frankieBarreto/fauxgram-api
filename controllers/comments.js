const db = require("../models");

const index = (req, res) => {
    db.Comment.find({}, (err, foundComments) => {
        if(err) console.log('Error in post#index:', err);

        if(!foundComment.length) return res.status(200).json({"message": "No comment found in db"});

        res.status(200).json({ "comment": foundComments });
    });
};

const show = (req, res) => {
    db.Comment.create(req.body, (err, foundComment)=> {
        if (err) console.log('Error in comment#show:', err);

        if (!foundComment) return res.status(200).json({"message": "No comment with that id found in db"});

        res.status(200).json({ "comment": foundComment })
    });
}

const create = (req, res) => {
    db.Comment.create(req.body, (err, savedComment) => {
        if (err) console.log('Error in comment#create:', err);

        res.status(201).json({ "comment": savedComment });
    });
};


const update = (req, res) => {
    db.Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedComment) => {
        if (err) console.log('Error in comment#update:', err);

        if(!updatedPost) return res.status(200).json({ "message": "No comment with that id found in db" });

        res.status(200).json({ "comment": updatedPost });
    });
};

const destroy = (req, res) => {
    db.Post.findByIdAndDelete(req.params.id, (err, deletedComment) => {
        if (err) console.log('Error in comment#destroy:', err);

        if(!deletedComment) return res.status(200).json({ "message": "No comment with that id found in db" });

        res.status(200).json({ "comment": deletedComment });
    });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};


