const { ObjectId } = require('mongodb');
const {userDAO} = require('./users')

let {getClient, collection} = require('./serverFunctions');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Serve static files from the 'public' directory
app.use('/static',express.static(path.join(__dirname, 'public')));
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

app.post('/login',async (req,res)=>{
  // test authenticity req.body
  let auth_user = await collection.findOne({ username: req.body.username, password: req.body.password  });
  if (auth_user) {
    res.status(200);
    res.type('applicatin/json');
    let resObj = {};
    resObj.sessionId = uuidv4();
    let answer = JSON.stringify(resObj);

    const filter = { _id: new ObjectId(auth_user._id) };
    const update = { $set: { currentSessionId: resObj.sessionId } };

    // any errors here will return as 500 internal error
    const result = await collection.findOneAndUpdate(filter, update, { returnDocument: 'after' });
  
    res.send(answer);
  } else {
    res.status(401);
    res.type('applicatin/json');
    let resObj = {'message': "Authentication Error"};
    answer = JSON.stringify(resObj);
    res.send(answer);

  };

});

app.put('/favorites', async (req,res)=>{
  let {ad, user} = req.body;
  // athenticate the session
  let auth_user = await collection.findOne({ 
    username: user.username, currentSessionId: user.sessionId 
  });

  if (auth_user){
    // add the fav after checking for dubs
    // let success = addFavorite(user.username, ad)
    const filter = { 
      _id: new ObjectId(auth_user._id) ,
      // in the array type fiels named favorites, to NOT have element match to the uniqueField, 
      ["favorites"]: { $not: { $elemMatch: { ["id"]: ad["id"] } } }

    };
    const update = { $push: { ["favorites"]: ad } };

    // any errors here will return as 500 internal error
    const result = await collection.findOneAndUpdate(filter, update, { returnDocument: 'after' });
    
    if(result.value){
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
 
app.post('/showfavorites', async (req, res)=>{
  // athenticate the session
  let auth_user = await collection.findOne({ 
    username: req.body.username, currentSessionId: req.body.sessionId
  });

  if (auth_user){
    const favs = auth_user.favorites;
    res.status(200);
    res.type('applicatin/json');
    res.send( JSON.stringify(favs) );
  } else { 
    res.status(401);
    res.type('applicatin/json');
    let resObj = {'message': "Authentication Error"};
    answer = JSON.stringify(resObj); 
    res.send(answer);
  }
});

const port =  3000;

// get client is a returned promise from the call of run() function, not a function
// after promise resolved it is a client object
// app.listen called after connecting with client ensures that no rest calls will be made to nodejs
// before it has connected with atlas
getClient.then(async client=>{ // this should be inside DAO
  app.listen(port,()=>console.log('Listening to port: ', port));
  collection = client.db('wikiAPI').collection('users');
  userDAO.collection = collection;
})
.catch(console.dir); // console.log(err=>console.log(err))


