const express = require('express');
const methodOverride = require('method-override')
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// mock array of projects
// let reviews = [
//   { title: "Great Review", movieTitle: "Batman II" },
//   { title: "Awesome Movie", movieTitle: "Titanic" }
// ]

//override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
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

//CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) //redirect
  }).catch((err) => {
    console.log(err.message)
  })
});

app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
});

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

// Edit
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
});

// DELETE
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});

// app.post('/reviews', (req, res) => {
//   Review.create(req.body).then((review) => {
//     console.log(review);
//     res.redirect('/');
//   }).catch((err) => {
//     console.log(err.message);
//   })
// });
