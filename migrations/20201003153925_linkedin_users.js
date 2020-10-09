exports.up = function(knex) {
    return knex.schema.createTable('linkedin_users', (table) => {
        table.increments('id').notNullable();
        table.string('linkedin_id').unique();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('profile_picture').notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('linkedin_users');
  };