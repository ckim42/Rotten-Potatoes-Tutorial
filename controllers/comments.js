const Comment = require('../models/comment');
const express = require('express');
const app = express();

module.exports = (app) => {

  // CREATE Comment
  app.post('/reviews/comments', (req, res) => {
    // console.log("Helloooo");
    Comment.create(req.body).then(comment => {
      // console.log(comment); //test hmm it works
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  //DELETE
  app.delete('/reviews/comments/:id', function (req, res) {
    console.log("DELETE comment")
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

}
