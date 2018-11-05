const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

const Review = mongoose.model('Review', { //model is capitalized and singular, like with classes
  title: String,
  movieTitle: String
});

Review.find()
  .then(review => {
  })
  .catch(err => {

  });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => { //Index
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});
