const {userDAO} = require('./users')

let {getClient} = require('./serverFunctions');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use('/static',express.static(path.join(__dirname, 'public')));
app.use(express.json());

function serveStatic(res, file){
  res.sendFile(`public/${file}.html`, { root: __dirname });
}

app.get('/category', (req, res) => serveStatic(res, 'category'));
app.get('/subcategory', (req, res) => serveStatic(res, 'subcategory'));
app.get('/favorites', (req, res) => serveStatic(res, 'favorite-ads'));
app.get('/', (req, res) => serveStatic(res, 'index'));


app.post('/login',async (req,res)=>{
  try {
    const auth_user = await userDAO.authenticateLogin(req.body.username, req.body.password );
    if (auth_user) {
      //res.type('applicatin/json'); dont need
      const sessionId = uuidv4();
      // any errors here will return as 500 internal error
      await userDAO.updateSession(auth_user._id, sessionId )
      res.status(200).json({sessionId});
    } else {
      res.status(401).json({ message: 'Authentication Error' });
    };  
  } catch {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/favorites', async (req,res)=>{
  try {
    const {ad, user} = req.body;
    const auth_user = await userDAO.authenticateSession(user.username, user.sessionId);
    if (auth_user){
      const result = await userDAO.addToFavorites(auth_user._id, ad);
      if(result.value){
        res.status(200).json({});
      } else {
        res.status(409).json({ message: 'Duplication Error, ad already in favorites' });
      }
    } else {
      res.status(401).json({ message: 'Authentication Error' });
    }
  }catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/favorites', async (req, res) => {
  try {
    const { ad, user } = req.body;

    const auth_user = await userDAO.authenticateSession(
      user.username,
      user.sessionId
    );

    if (!auth_user) {
      return res.status(401).json({ message: 'Authentication Error' });
    }

    const filter = { _id: auth_user._id };
    const update = {
      $pull: { favorites: { id: ad.id } }
    };

    const result = await userDAO.collection.findOneAndUpdate(
      filter,
      update,
      { returnDocument: 'after' }
    );

    if (result.value) {
      res.status(200).json({});
    } else {
      res.status(404).json({ message: 'Ad not found in favorites' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

 
app.post('/showfavorites', async (req, res)=>{
  try {
    const auth_user = await userDAO.authenticateSession(req.body.username, req.body.sessionId)
    if (auth_user){
      res.status(200).json(auth_user.favorites);
    } else { 
      res.status(401).json({ message: 'Authentication Error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/logout', async (req, res) => {
  try {
    const { username, sessionId } = req.body;

    const auth_user = await userDAO.authenticateSession(username, sessionId);
    if (!auth_user) {
      return res.status(401).json({ message: 'Authentication Error' });
    }

    await userDAO.updateSession(auth_user._id, null);
    res.status(200).json({});
  } catch {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get client is a returned promise from the call of run() function, not a function
// after promise resolved it is a client object
// app.listen called after connecting with client ensures that no rest calls will be made to nodejs
// before it has connected with atlas
const port = process.env.PORT || 3000;
getClient.then(async client=>{ // this should be inside DAO
  app.listen(port,()=>console.log('Listening to port: ', port));
  let collection = client.db('wikiAPI').collection('users');
  userDAO.collection = collection;
})
.catch(console.dir); // console.log(err=>console.log(err))


