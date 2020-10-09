const facebookUsers = require('../models/facebookUsers');
module.exports = class facebookUserService {
    async findAll(txn) {
        const user_details = await facebookUsers.query(txn);
        return user_details;
    }

    async findOne(facebookId) {
        const user_details = await facebookUsers.query().where(facebookId);
        return user_details;
    }

    async Create(userInfo) {
        return await facebookUsers.query().insertGraph(userInfo);
    }

    async Update(userInfo) {
        // console.log(userInfo, "userInfo");
        return await facebookUsers.query().update(userInfo)
        .where({"facebook_id": userInfo.facebook_id});
    }
}