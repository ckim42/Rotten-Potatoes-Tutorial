const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: true })); //must appear after const app = express() and before routes

var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

const Review = mongoose.model('Review', { //model is capitalized and singular, like with classes
  title: String,
  description: String,
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

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
});

app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
});

app.post('/reviews', (req, res) => { //Create
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) //Redir to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});
