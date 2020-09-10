const Sequelize = require('sequelize');

const dbutils = require('../utils/db-utils')
const User = require('./User')
const Roles = require('./Roles')

const UserRoleAssignment = dbutils.define('UserRoleAssignment', {
    id : {
        type : Sequelize.BIGINT,
        primaryKey : true,
        autoIncrement : true
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    rolesId: {
        type: Sequelize.INTEGER,
        references : {
            model : 'Roles',
            key : 'id'
        }
    }
}, {
    tableName: 'USER_ROLE_ASSINGMENT',
    timestamps : false
});


User.hasMany(UserRoleAssignment)
Roles.hasMany(UserRoleAssignment)

module.exports = User;