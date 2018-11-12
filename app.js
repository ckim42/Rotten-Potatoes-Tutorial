const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const reviews = require('./controllers/reviews');
//const Review = require('./models/review.js');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');

mongoose.connect('mongodb://localhost/rotten-potatoes');

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true })); //must appear after const app = express() and before routes
app.use(reviews);
//app.user(Review);

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});

module.exports = app;
