const yup = require("yup")


const content_schema = yup.object().shape({
    title : yup.string().trim().required(),
    long_desc : yup.string().trim().required(),
    visible_at : yup.number().required().positive().moreThan(0),
    created_at: yup.number().required(),
    last_updated : yup.number(),
    created_by : yup.number().required()
})



const validator = {


    validateContentRequest(requestObject) {

        content_schema.validate({
            title : requestObject.title,
            long_desc : requestObject.long_desc,
            visible_at : requestObject.visible_at,
            created_at: requestObject.created_at,
            last_updated : requestObject.last_updated,
            created_by : requestObject.created_by
        })
        .then(valid => {
            if(valid){
                return 200
            }
        })

        return 400
    }

}

module.exports = validator