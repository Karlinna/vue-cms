const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config()

const password_utils = {
    createPasswordHash(password, user) {
        let salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS) || 10);
        
        const hash = bcrypt.hashSync(password, salt);

        

        return {
            hash : hash,
            salt : salt
        };

    },
    comparePwHashesWithSalt(given_pass, needed_pass, salt) {
        const hash = bcrypt.hashSync(given_pass, salt);
        

        return hash === needed_pass;
    }
}


module.exports = password_utils;