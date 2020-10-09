// Update with your config settings.

const Dotenv = require('dotenv');
Dotenv.config({ path: `${__dirname}/.env` });
console.log(process.env.DB_HOST);

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'passportDB',
      user:     'root',
      password: 'anandbabu'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'passportDB',
      user:     'root',
      password: 'anandbabu'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '/migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
