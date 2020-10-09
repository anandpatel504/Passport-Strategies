const githubUsers = require('../models/githubUsers');
module.exports = class githubUserservice {
    async findAll(txn) {
        const user_details = await githubUsers.query(txn);
        return user_details;
    }

    async findOne(githubId) {
        const user_details = await githubUsers.query().where(githubId);
        return user_details;
    }

    async Create(userInfo) {
        return await githubUsers.query().insertGraph(userInfo);
    }

    async Update(userInfo) {
        return await githubUsers.query().update(userInfo)
        .where({"github_id": userInfo.github_id});
    }
}