
exports.up = function (knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments();
        table.string('date');
        table.string('time');
        table.string('office');
        table.string('event');
        table.string('mobile_number')
    }); };
 exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
