const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');

// mock array of projects
// let reviews = [
//   { title: "Great Review", movieTitle: "Batman II" },
//   { title: "Awesome Movie", movieTitle: "Titanic" }
// ]



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
const Review = require('./models/review');

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
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
