//INITIALIZATIONS
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();

//MIDDLEWARE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true })); //must appear after const app = express() and before routes

//MODEL (Review model has been copy-pasted to models/review.js)
const Review = require('./models/review')
const Comment = require('./models/comment')

//CONTROLLERS
const reviewsController = require('./controllers/reviews');
const commentsController = require('./controllers/comments');
// app.use(require('./controllers/reviews'));
// app.use(require('./controllers/comments'));
reviewsController(app);
commentsController(app);

// Point this production mongodb database URI
const port = process.env.PORT || 3000
// Mongoose connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost.27017/rotten-potatoes"; mongoose.connect(mongoUri, { useNewUrlParser: true } );

//WEB SERVER CHECK
app.listen(port, () => {
  console.log('App listening on port 3000!')
});

module.exports = app;
