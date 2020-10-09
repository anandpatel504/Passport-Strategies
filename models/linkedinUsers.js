const { Model } = require ("objection");
const knex = require('../config/config');
Model.knex(knex);

class LinkedinUsers extends Model {
    static get tableName() {
        return 'linkedin_users';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email'],
            properties: {
                id: { type: 'integer' },
                linkedin_id: {type: 'string', minLength: 1, maxLength: 255},
                first_name: {type: 'sting'},
                last_name: {type: 'sting'},
                email: {type: 'string'},
                profile_picture: {type: 'string'}
            }
        }
    }
}
module.exports = LinkedinUsers;