const { Model } = require('objection');
const knex = require('../config/config');
Model.knex(knex)

class GoogleUsers extends Model {
  static get tableName() {
    return 'google_users';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email'],
      properties: {
        id: { type: 'integer' },
        google_id: { type: 'string', minLength: 1, maxLength: 255 },
        full_name: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        profile_picture: { type: 'string' },
      }
    };
  }
}
module.exports = GoogleUsers;