
exports.up = function(knex) {
    return knex.schema.createTable('github_users', (table) => {
        table.increments('id').notNullable();
        table.string('github_id').unique();
        table.string('name').notNullable();
        table.string('user_name').notNullable();
        table.string('email').notNullable();
        table.string('profile_picture').notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('github_users');
  };