async function loginAuthentication(user_id, sessionId){
    const filter = { _id: new ObjectId(user_id) };
    const update = { $set: { currentSessionId: sessionId } };
    // any errors here will return as 500 internal error
    return await collection.findOneAndUpdate(filter, update, { returnDocument: 'after' });
}

async function authenticateSession(username, sessionId){
    return await collection.findOne({ 
        username: username, currentSessionId: sessionId 
      });
}

async function addFavorite(user_id, ad){
    const filter = { 
        _id: new ObjectId(user_id) ,
        // in the array type fiels named favorites, to NOT have element match to the uniqueField, 
        ["favorites"]: { $not: { $elemMatch: { ["id"]: ad["id"] } } }
      };
      const update = { $push: { ["favorites"]: ad } };
      // any errors here will return as 500 internal error
      return await collection.findOneAndUpdate(filter, update, { returnDocument: 'after' });
}