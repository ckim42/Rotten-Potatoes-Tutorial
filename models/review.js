const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true});

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String
});

module.exports = Review;
