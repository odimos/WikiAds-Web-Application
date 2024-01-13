let  DB = {
    "users":[
        {
            "id":1,
            "username": "mitsos",
            "password": "123",
            "currentSessionId": undefined,
            "favorites":[]
        },
    ]
}

// unique id's and usernames

function findById(id){
    return DB.users.find(user => user.id === id);
}

function findByName(username){
    return DB.users.find(user => user.username === username);
}

function updateCurrentSession(user_id, sessionid ){
    let user = findById(user_id);
    user.currentSessionId = sessionid;
    return sessionid;
}

function authenticateSession(username, sessionId){
    let user = findByName(username);
    if (!user) return false;
    return user.currentSessionId == sessionId;
}

function authenticate(username, password){
    let user = findByName(username);
    if (user!= undefined && password == user.password) return user.id;
    return 0;
}


function addFavorite(username, object){
    let user = findByName(username);
    // check for dubs
    let dub = user.favorites.find(fav => fav.id === object.id);
    if (dub){
        return false;
    };
    user.favorites.push(object);
    return true;
}

module.exports = {
    authenticate,
    authenticateSession,
    updateCurrentSession,
    addFavorite
}