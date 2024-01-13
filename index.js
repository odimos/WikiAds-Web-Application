const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const {authenticate} = require('./DAO.js');

const app = express();

// Set up Handlebars as the view engine
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './public');

// Serve static files from the 'public' directory
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



app.get('/category', function (req, res) {
    res.sendFile('public/category.html', { root: __dirname });
});

app.get('/subcategory', function (req, res) {
  res.sendFile('public/subcategory.html', { root: __dirname });
});


app.get('/', function (req, res) {
  console.log('index');
  res.sendFile('public/index.html', { root: __dirname });
});

app.post('/login',(req,res)=>{
  // test authenticity req.body
  let auth = authenticate(req.body.username, req.body.password );
  if (auth) {
    res.status(200);
    res.type('applicatin/json');
    let resObj = {};
    resObj.sessionId = uuidv4();
    let answer = JSON.stringify(resObj);
    res.send(answer);
  } else {
    res.status(401);
    res.type('applicatin/json');
    let resObj = {};
    resObj = {'message': req.body};
    answer = JSON.stringify(resObj);
    res.send(answer);

  };

});

const port =  3000;
app.listen(port, ()=>{
  console.log('Start listening localhost:'+port)
})


// Middleware to parse urlencoded data - for forms mainly
//app.use(bodyParser.urlencoded({ extended: false }));
// Middleware to parse JSON data
// app.use(express.json());

