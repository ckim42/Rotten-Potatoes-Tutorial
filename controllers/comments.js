const Comment = require('../models/comment');
const express = require('express');
const app = express();

module.exports = (app) => {

  // // NEW Comment
  // app.post('/reviews/comments', (req, res) => {
  //   res.send('reviews comment')
  // })

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

}
