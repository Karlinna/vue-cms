var jwt = require('jsonwebtoken');
let env = require('dotenv').config()

export default {
    useEnv() { env.dummy = "", console.log(env)},
    verifyToken(token) {
        if(typeof token == 'undefined' || token.trim() == ""  ) return false
        try {
            token = token.replace("Bearer ", "")

            let decoded = jwt.verify(token, process.env.VUE_APP_JWT_SECRET)


            let now = new Date()
            const epoch = Math.round(now.getTime() / 1000)
            return epoch < decoded.exp
        } catch (err) {

            return false
        }
    },
    getClaims(token) {
        
        if(this.verifyToken(token)) {
            token = token.replace("Bearer ", "")

            let decoded = jwt.verify(token, process.env.VUE_APP_JWT_SECRET)



            

            return decoded.claims;
        }else {
            return null;
        }
    },
    hasClaim(claim, token) {

        let claims = this.getClaims(token)
        
        

        return claims.includes(claim)
    },

    getSubject(token) {
        if(this.verifyToken(token)) {
            let decoded = jwt.verify(token, process.env.VUE_APP_JWT_SECRET)

            return decoded.name
        }
        else{
            return null
        }
    }


}