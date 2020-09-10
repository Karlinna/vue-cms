const db = require('../utils/db-utils')
const User = require('../model/User')
const Roles = require('../model/Roles')
const UserRoleAssingment = require('../model/UserRoleAssignment')
const user_utils = require('../utils/user-utils')
const password_utils = require('../utils/password-utils')



const repo = {

    async save(user) {
        
        let dao = {};
        
        await User.create({
            name: user.name,
            password: user.password,
            roles: user.roles,
            lastLogin: user.lastLogin,
            verified: user.verified,
            salt : user.salt
        }, { returning : true})
        .then(function(m) {
            dao = m
        })


        return dao
    

     
    },
    async findUser(user, pass) {
        let u = await User.findOne(
            {
                where: {
                    name : user,
                }
            }
        )

        if(typeof u == 'undefined' || u == null)
            return { code : 401, user : null};


        
        let pw = password_utils.comparePwHashesWithSalt(pass, u.dataValues.password, u.dataValues.salt)

        
        if(!pw)
            return {code: 401, user : null};     


        

        return {code : 200, user : u};
    }


}


module.exports = repo;