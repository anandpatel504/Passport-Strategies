exports.up = function(knex) {
    return knex.schema.createTable('facebook_users', (table) => {
        table.increments('id').notNullable();
        table.string('facebook_id').unique();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('profile_picture').notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('facebook_users');
  };