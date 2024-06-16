/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    await knex.schema.createTable('courses', (table) => {
        table.increments('id').primary()

        table.string('title').notNullable()

        table.string('content').notNullable()

        table.float('price').notNullable()

        table.integer('categoryId').notNullable()
        table.foreign('categoryId').references('id').inTable('courseCategories')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    await knex.schema.dropTable('courses')
}