const express = require('express');
const router = express.Router();

const user_util = require('../utils/user-utils');
const user_repo = require('../repositories/user-repository');


router.get('/', (req, res) => {
    res.send("Get All User!")
});

router.post('/', async (req, res) => {
    try {

        let pojo = await user_util.createUser(req.body);
        if(pojo == 500) {
            res.status(400).send({error : "Failed to create user, malformed request", code : 400})
            return;
        }
        else{
            let dao = await user_repo.save(pojo);

            res.status(200).send(dao);
        }
    } catch (err) {
        if (err.message.includes("TypeError")) {
            res.status(400).send({ error: "Failed to create User, malformed request!", code: 400, trace : err.message})
            console.log(err)
            return;
        }
        else {
            res.status(500).send({ error: "Can't define error, please check request!", code: 500, trace : err.message})
            console.log(err)
            return;
        }
    }

});

router.delete('/', (req, res) => {
    res.send("Deletes a user!")
});

router.put('/', (req, res) => {
    res.send("Updates a user!")
});

module.exports = router;