const Sequelize  = require('sequelize');

const dbutils = require('../utils/db-utils')


const User = dbutils.define('User', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },    
    name : {
        type : Sequelize.STRING
    },
    password : {
        type : Sequelize.STRING
    },
    roles : {
        type : Sequelize.INTEGER
    },
    lastLogin : {
        type : Sequelize.BIGINT
    },
    verified : {
        type : Sequelize.INTEGER,
    },
    salt : {
        type : Sequelize.STRING
    }
}, {
    tableName : "USERS",
    timestamps : false
});


module.exports = User;