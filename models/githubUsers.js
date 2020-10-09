const { Model } = require ("objection");
const knex = require('../config/config');
Model.knex(knex);

class GithubUsers extends Model {
    static get tableName() {
        return 'github_users';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email'],
            properties: {
                id: { type: 'integer' },
                github_id: {type: 'integer', minLength: 1, maxLength: 255},
                name: {type: 'sting'},
                user_name: {type: 'sting'},
                email: {type: 'string'},
                profile_picture: {type: 'string'}
            }
        }
    }
}
module.exports = GithubUsers;