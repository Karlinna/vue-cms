const express = require('express');
const router = express.Router();

const content_repo = require("../repositories/content-repository")
const validator = require("../utils/content-validator")

const errors = require("../errors/errors");
const { isNullOrUndefined } = require('util');

const jwt_util = require("../utils/jwt-utils")



router.use(function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else{
        let verify = jwt_util.verifyToken(req.headers.authorization)
        if(verify)
            next();
        else
            return res.status(401).send(errors.build(401, "Unauthorized to use this"))
    }
    
})


router.get("/", async (req, res) => {
    let result = await content_repo.findAll();

    
    if(isNullOrUndefined(result))
        res.status(401)
    else
        res.send(result)
})


router.post("/", async (req, res) => {
    try {
        let result = validator.validateContentRequest(req.body)
        if(result == 200){
          let dao = await content_repo.save(req.body)
          
          if(isNullOrUndefined(dao.id))
            res.status(204).send("No Content")
          else
            res.status(200).send(dao)

        }else{
            res.status(400).send(errors.build(res, "Malformed Request!"))
        }
    }
    catch(err) {
        res.status(500).send(errors.build(500, "Internal server error", err.message))
    }



})




module.exports = router;