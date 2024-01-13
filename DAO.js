let  DB = {
    "users":[
        {
            "username": "mitsos",
            "password": "123"
        },
    ]
}

function authenticate(username, password){
    user = DB.users.find(user => user.username === username);
    if (user!= undefined && password == user.password) return true;
    return false;
}

module.exports = {
    authenticate
}