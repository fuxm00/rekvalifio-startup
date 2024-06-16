/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    await knex.schema.createTable('participants', (table) => {
        table.increments('id').primary()

        table.string('name').notNullable()

        table.integer('orderId').notNullable()
        table.foreign('orderId').references('id').inTable('orders')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    await knex.schema.dropTable('participants')
}