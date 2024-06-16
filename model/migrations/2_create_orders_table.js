/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    await knex.schema.createTable('orders', (table) => {
        table.increments('id').primary()

        table.boolean('archived').notNullable().defaultTo(false)

        table.boolean('completed').notNullable().defaultTo(false)

        table.string('note')

        table.string('email').notNullable()

        table.string('phone').notNullable()

        table.float('price').notNullable()

        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();

        table.integer('courseId').notNullable()
        table.foreign('courseId').references('id').inTable('courses')

        table.integer('billingAddressId').notNullable()
        table.foreign('billingAddressId').references('id').inTable('addresses')

        table.integer('mailingAddressId')
        table.foreign('mailingAddressId').references('id').inTable('addresses')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    await knex.schema.dropTable('orders')
}