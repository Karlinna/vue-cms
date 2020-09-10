const Sequelize  = require('sequelize');

const dbutils = require('../utils/db-utils')


const Content = dbutils.define('Content', {
    id : {
        type : Sequelize.BIGINT,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : Sequelize.STRING
    },
    long_desc : {
        type : Sequelize.STRING
    },
    visible_at : {
        type : Sequelize.INTEGER
    },
    created_at: {
        type : Sequelize.BIGINT
    },
    last_updated : {
        type : Sequelize.BIGINT
    },
    created_by : {
        type : Sequelize.INTEGER,
        references : {
            model : "User",
            key : "id"
        }
    }
},
{
    tableName : "CONTENT",
    timestamps : false
});


module.exports = Content;