/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    await knex.schema.createTable('offers', (table) => {
        table.increments('id').primary()

        table.string('title').notNullable()

        table.date('startDate').notNullable()

        table.date('endDate').notNullable()

        table.integer('categoryId').notNullable()
        table.foreign('categoryId').references('id').inTable('courseCategories')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    await knex.schema.dropTable('offers')
}