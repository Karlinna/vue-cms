const yup = require('yup')

const password_utils = require('./password-utils')


const user = yup.object().shape({
    name: yup.string().trim().required(),
    password: yup.string().trim().required(),
    roles: yup.number().required(),
    lastLogin: yup.number(),
    verified: yup.number(),
    salt : yup.string().required()
});

const user_util = {

    async createUser(body) {
        body.lastLogin = 0;
        body.verified = 0;
        let pw = password_utils.createPasswordHash(body.password, body)
        body.password = pw.hash
        body.salt = pw.salt
        

        console.log(body)


        let val = false;

        await user.isValid(body).then(valid => {
            val = valid;
            console.log(val)
            
        })
        console.log(val)
        if (val)
            return body
        else
            return 500;
    },


    compareRole(a, b) {
        if (a.mask < b.mask)
            return 1;
        if (a.mask > b.mask)
            return -1;
        return 0;
    },

    getClaims(roles, userRole) {
        roles = roles.sort(this.compareRole);
        let claims = [];
        let tempRole = userRole;
        roles.forEach(y => {
            if (tempRole >= y.mask && tempRole - y.mask >= 0) {
                claims.push(y.name);
                tempRole = tempRole - y.mask;
            }
            else if (tempRole - y.mask == 0) {
                claims.push(y.name);
            }
        });


        return claims;
    },

    getMasks(roles, userRole) {
        roles = roles.sort(this.compareRole);
        let claims = [];
        let tempRole = userRole;
        roles.forEach(y => {
            if (tempRole >= y.mask && tempRole - y.mask >= 0) {
                claims.push({ id: y.id, mask: y.mask });
                tempRole = tempRole - y.mask;
            }
            else if (tempRole - y.mask == 0) {
                claims.push({ id: y.id, mask: y.mask });
            }
        });


        return claims;
    }



}

module.exports = user_util;