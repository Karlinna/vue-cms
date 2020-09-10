const db = require('../utils/db-utils')
const Roles = require('../model/Roles')



const repo = {

    async findAll() { return await Roles.findAll(); }

}


module.exports = repo;