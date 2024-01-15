const { ObjectId } = require('mongodb');

function UserDAO(){
    this.collection = null;

    this.authenticateLogin = async function(){

    };

    this.authenticateSession = async function(){

    };

    this.updateSession = async function(){

    };

    this.addToFavorites = async function(){

    }


};

let userDAO = new UserDAO();
module.exports = {
    userDAO
}

