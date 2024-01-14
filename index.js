const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const {authenticate, authenticateSession, updateCurrentSession, addFavorite, getFavorites} = require('./DAO.js');

const app = express();

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

app.get('/favorites', function (req, res){
  res.sendFile('public/favorite-ads.html', {root:__dirname})
})

app.get('/', function (req, res) {
  res.sendFile('public/index.html', { root: __dirname });
});

app.post('/login',(req,res)=>{
  // test authenticity req.body
  let auth_user_id = authenticate(req.body.username, req.body.password );
  if (auth_user_id) {
    res.status(200);
    res.type('applicatin/json');
    let resObj = {};
    resObj.sessionId = uuidv4();
    let answer = JSON.stringify(resObj);

    updateCurrentSession(auth_user_id, resObj.sessionId );
  
    res.send(answer);
  } else {
    res.status(401);
    res.type('applicatin/json');
    let resObj = {'message': "Authentication Error"};
    answer = JSON.stringify(resObj);
    res.send(answer);

  };

});

app.put('/favorites', (req,res)=>{
  let {ad, user} = req.body;
  // athenticate the session
  let authSess = authenticateSession(user.username, user.sessionId);

  if (authSess){
    // add the fav after checking for dubs
    let success = addFavorite(user.username, ad)
    if(success){
      res.status(200);
      res.send(JSON.stringify({}));
    } else {
      res.status(409);
      res.type('applicatin/json');
      let resObj = {'message': "Duplication Error, ad already in favorites"};
      answer = JSON.stringify(resObj);
      res.send(answer);
    }
  } else {
    res.status(401);
    res.type('applicatin/json');
    let resObj = {'message': "Authentication Error"};
    answer = JSON.stringify(resObj);
    res.send(answer);
  }
});
 
app.post('/showfavorites', function (req, res){
  let authSess = authenticateSession(req.body.username, req.body.sessionId);
  if (authSess){
    const favs = getFavorites(req.body.username);
    res.status(200);
    res.type('applicatin/json');
    res.send( JSON.stringify(favs) );
  } else { 
    res.send(401);
  }
})

const port =  3000;
app.listen(port, ()=>{
  console.log('Start listening localhost:'+port)
})


// Middleware to parse urlencoded data - for forms mainly
//app.use(bodyParser.urlencoded({ extended: false }));
// Middleware to parse JSON data
// app.use(express.json());

