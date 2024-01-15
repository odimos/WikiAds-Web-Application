const { ObjectId } = require('mongodb');

function UserDAO(){
    this.collection = null;

    this.authenticateLogin = function(username, password){
        return this.collection.findOne({ username, password });
    };

    this.authenticateSession = function(username, sessionId){
        return this.collection.findOne({ 
            username: username, currentSessionId: sessionId 
          });
    };

    this.updateSession = function(user_id, sessionId){
        const filter = { _id: new ObjectId(user_id) };
        const update = { $set: { currentSessionId: sessionId } };
        return this.collection.findOneAndUpdate(filter, update, { returnDocument: 'after' });
    };

    this.addToFavorites = function(user_id, ad){
        // add the fav after checking for dubs
        const filter = { 
            _id: new ObjectId(user_id) ,
            // in the array type fiels named favorites, to NOT have element match to the uniqueField, 
            ["favorites"]: { $not: { $elemMatch: { ["id"]: ad["id"] } } }
        };
        const update = { $push: { ["favorites"]: ad } };
        return this.collection.findOneAndUpdate(filter, update, { returnDocument: 'after' });
    };

};

let userDAO = new UserDAO();
module.exports = {
    userDAO
}

