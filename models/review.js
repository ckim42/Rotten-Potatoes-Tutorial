const mongoose = require('mongoose');

const Review = mongoose.model('Review', { //model is capitalized and singular, like with classes
  title: String,
  description: String,
  movieTitle: String
});

module.exports = Review;
