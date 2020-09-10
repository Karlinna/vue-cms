

const error = {

    build(code, status, trace) {
        if(typeof trace === 'undefined')
            return {
                code : code,
                status : status
            }
        else {
            return {
                code : code,
                status : status,
                trace : trace
            }

        }
        
    }

}



module.exports = error;