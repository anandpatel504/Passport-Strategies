const GoogleUsers = require('../models/googleUsers');
module.exports = class GoogleUserService {
    async findAll(txn) {
        const user_details = await GoogelUsers.query(txn);
        return user_details;
    }

    async findOne(googleId) {
        const user_details = await GoogleUsers.query().where(googleId);
        return user_details;
    }

    async Create(userInfo) {
        return await GoogleUsers.query().insertGraph(userInfo);
    }

    async Update(userInfo) {
        // console.log(userInfo, "userInfo");
        return await GoogleUsers.query().update(userInfo)
        .where({"google_id": userInfo.google_id});
    }
}