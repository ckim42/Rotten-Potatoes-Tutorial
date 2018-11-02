const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// mock array of projects
// let reviews = [
//   { title: "Great Review", movieTitle: "Batman II" },
//   { title: "Awesome Movie", movieTitle: "Titanic" }
// ]

// per tutorial, this must appear AFTER const app = express() and before routes
app.use(bodyParser.urlencoded({extended: true}));
// body-parser gives new attribute of req obj called "req.body" and this will contain the form data! :D :D :D
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

// INDEX
app.get('/', (req, res) => {
  // gets all reviews from the database
  Review.find()
    // promise that sends reviews data to the page
    .then(reviews => {
        // renders the page with the reviews data referred to as reviews
        res.render('reviews-index', { reviews: reviews });
    })
    // error catch
    .catch(err => {
      console.log(err);
    })
});

//test
// app.get('/secret', (req, res) => {
//   res.render("secret");
// })

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
});

app.get('/reviews/:id', (req, res) => {
  Review.findbyId(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});

app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
});

//CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) //redirect
  }).catch((err) => {
    console.log(err.message)
  })
})
