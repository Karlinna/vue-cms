const express = require('express');
const helmet = require('helmet')
const app = express();

const dbutils = require('./utils/db-utils')
const jwtutil = require('./utils/jwt-utils')
const userutil = require('./utils/user-utils')
const user_repo = require('./repositories/user-repository')
const role_repo = require('./repositories/role-repository')
const cors = require('cors')

const errors = require('./errors/errors');
const { isNullOrUndefined } = require('util');


app.listen(process.env.PORT || 5000, () => {
    console.log("Express is running on : " + process.env.PORT || 5000)
})


app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))


dbutils.authenticate()
    .then(() => console.log("Database connection was established!"))
    .catch((err) => console.error("Database connection error occured: " + err + "\nConnection String is: " + CONNECTION_URL));



app.get("/", (req, res) => res.send("ROOT"));

app.get("/test", async (req, res) => {
    let code = jwtutil.verifyToken(req.headers.authorization)

    if(code) {
        res.status(200).send("OK")
    }
    else{
        res.status(401).send("NOT OK")
    }
})

app.use("/rest/v1/user", require('./routes/user'))
app.use("/rest/v1/content", require('./routes/content'))

app.post("/login",async (req, res) => {
    try {

        if(isNullOrUndefined(req.body.name) || isNullOrUndefined(req.body.password))
            res.send(errors.build(400, "Bad Request! Malformed data arrived."));

        let code = await user_repo.findUser(req.body.name, req.body.password);

        if (code.code == 200) {
            let token = jwtutil.createToken(code.user, await role_repo.findAll())
            res.status(200).send({ token: token })
        }
        else if (code.code == 401) {
            res.status(401).send(errors.build(401, "Unathorized! Username or password does not match!"));
        }


    } catch (err) {
        res.status(500).send(errors.build(500, "Internal server error. Inform administrator.", process.env.DEV ? err.message : null));
    }

})