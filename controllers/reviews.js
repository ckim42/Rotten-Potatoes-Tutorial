const Review = require('../models/review');
const Comment = require('../models/comment');
const express = require('express');
const app = express();

module.exports = (app) => {

  app.get('/', (req, res) => { //Index
    Review.find()
      .then(reviews => {
        res.render('reviews-index', {reviews: reviews});
      })
      .catch(err => {
        console.log(err);
      });
  });

  //NEW
  app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
  });

  //UPDATE
  app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id).then((review) => {
      res.render('reviews-edit', { review: review })
    }).catch((err) => {
      console.log(err.message);
    })
  });

  // SHOW
  app.get('/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
      // fetch its comments
      Comment.find().then((comments) => {
        // console.log(comments); //testing
        // respond with the template with both values
        res.render('reviews-show', { review: review, comments: comments })
      })
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
  });

  //EDIT
  app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
      res.render('reviews-edit', {review: review});
    })
  });

  //CREATE
  app.post('/reviews', (req, res) => { //Create
    Review.create(req.body).then((review) => {
      console.log(review)
      res.redirect(`/reviews/${review._id}`) //Redir to reviews/:id
    }).catch((err) => {
      console.log(err.message)
    })
  });

  //UPDATE
  app.put('/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
          console.log(review);
          res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
      })
      .catch(err => {
          console.log(err.message)
      });
  });

  //DELETE
  app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  });

}
