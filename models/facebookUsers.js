const { Model } = require ("objection");
const knex = require('../config/config');
Model.knex(knex);

class FacebookUsers extends Model {
    static get tableName() {
        return 'facebook_users';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email'],
            properties: {
                id: { type: 'integer' },
                facebook_id: {type: 'string', minLength: 1, maxLength: 255},
                name: {type: 'sting'},
                email: {type: 'string'},
                profile_picture: {type: 'string'}
            }
        }
    }
}
module.exports = FacebookUsers;