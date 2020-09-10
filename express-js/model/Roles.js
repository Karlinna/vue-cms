const Sequelize  = require('sequelize');

const dbutils = require('../utils/db-utils')


const Roles = dbutils.define('Roles', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true
    },
    mask : {
        type : Sequelize.INTEGER
    },
    name : {
        type : Sequelize.STRING
    }
},
{
    tableName : "ROLES",
    timestamps : false
});


module.exports = Roles;