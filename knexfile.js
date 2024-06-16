export default {
    client: 'sqlite3',
    connection: {
        filename: './db.sqlite',
    },
    useNullAsDefault: false,
    migrations: {
        directory: './model/migrations'
    }
}