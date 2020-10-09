exports.up = function(knex) {
    return knex.schema.createTable('google_users', (table) =>{
        table.increments('id').notNullable();
        table.string('google_id').unique();
        table.string('full_name').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').unique();
        table.string('profile_picture').notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('google_users');
  };