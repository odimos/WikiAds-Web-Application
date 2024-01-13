const express = require('express');
const path = require('path');
const {getCategories, getSubCategories, getAdsFromCategory} = require('./serverFunctions')

const app = express();

// Set up Handlebars as the view engine
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './public');

// Serve static files from the 'public' directory
app.use('/static',express.static(path.join(__dirname, 'public')));

app.get('/category', function (req, res) {
    res.sendFile('public/category.html', { root: __dirname });
});


app.get('/', function (req, res) {
  console.log('index');
  res.sendFile('public/index.html', { root: __dirname });
});



const port =  3000;
app.listen(port, ()=>{
  console.log('Start listening localhost:'+port)
})


// Middleware to parse urlencoded data - for forms mainly
//app.use(bodyParser.urlencoded({ extended: false }));
// Middleware to parse JSON data
// app.use(express.json());

