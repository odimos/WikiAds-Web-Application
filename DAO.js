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
    return currentSessionId;
}

function authenticateSession(username, sessionId){
    let user = findByName(username);
    if (!user) return false;
    return user.currentSessionId = sessionId;
}

function authenticate(username, password){
    user = findByName(username);
    if (user!= undefined && password == user.password) return user.id;
    return 0;
}

module.exports = {
    authenticate
}