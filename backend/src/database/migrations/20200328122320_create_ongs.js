//CRIA TABLELA COM METODO UP
exports.up = function(knex) {
 return knex.schema.createTable('ongs', function (table){
     table.string('id').primary();
     table.string('name').notNullable();
     table.string('email').notNullable();
     table.string('whatsapp').notNullable();
     table.string('city').notNullable();
     table.string('uf',2).notNullable();     
 });
};

//DESFAZ A TABELA SE ALGO DER ERRADO COM DOWN
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
