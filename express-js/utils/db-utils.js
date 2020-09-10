const { Sequelize } = require('sequelize');

const dotenv = require('dotenv').config()

const CONNECTION_URL = 
    `${process.env.DB_DIALECT}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;



const db = new Sequelize(CONNECTION_URL);


module.exports = db;