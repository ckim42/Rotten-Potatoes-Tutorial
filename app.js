const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
let reviews = [
  { title: "Review", movieTitle: "Batman II" },
  { title: "Awesome Movie", movieTitle: "Titanic" }
]

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => { //Index
  res.render('reviews-index', { reviews: reviews });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});
