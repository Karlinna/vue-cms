const Content = require('../model/Content');




const repo = {

    async findAll() { return await Content.findAll(); },

    async save(content) {
        let dao = {}

        await Content.create({
            title : content.title,
            long_desc : content.long_desc,
            visible_at : content.visible_at,
            created_at: content.created_at,
            last_updated : content.last_updated,
            created_by : content.created_by
        })
        .then(res => dao = res)


        return dao;
    }

}


module.exports = repo;