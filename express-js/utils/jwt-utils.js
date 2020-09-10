var jwt = require('jsonwebtoken');
const user_util = require('./user-utils');
const dotenv = require('dotenv').config()

const jwtUtil = {

    createToken(user, roleset) {
        let token = {
            exp: Math.floor(Date.now() / 1000 + (3600 * process.env.JWT_HOURS)),
            name: user.name,
            claims: user_util.getClaims(roleset, user.roles)
        };

        return jwt.sign(token, process.env.JWT_SECRET);

    },
    verifyToken(token) {
        if(!token) return false
        try {
            token = token.replace("Bearer ", "")

            let decoded = jwt.verify(token, process.env.JWT_SECRET)

            let now = new Date()
            const epoch = Math.round(now.getTime() / 1000)
            return epoch < decoded.exp
        } catch (err) {
            return false
        }
    }


}

module.exports = jwtUtil;