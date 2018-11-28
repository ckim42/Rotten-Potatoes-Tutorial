//INITIALIZATIONS
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const mongoose = require('mongoose');

//MIDDLEWARE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true })); //must appear after const app = express() and before routes

//CONTROLLERS
const reviews = require('./controllers/reviews.js')(app);
const comments = require('./controllers/comments.js')(app);

//SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!')
});

module.exports = app;
