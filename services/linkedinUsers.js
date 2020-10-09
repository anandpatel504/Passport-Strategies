const linkedinUsers = require('../models/linkedinUsers');
module.exports = class linkedinUserService {
    async findAll(txn) {
        const user_details = await linkedinUsers.query(txn);
        return user_details;
    }

    async findOne(linkedinId) {
        const user_details = await linkedinUsers.query().where(linkedinId);
        return user_details;
    }

    async Create(userInfo) {
        return await linkedinUsers.query().insertGraph(userInfo);
    }

    async Update(userInfo) {
        return await linkedinUsers.query().update(userInfo)
        .where({"linkedin_id": userInfo.linkedin_id});
    }
}