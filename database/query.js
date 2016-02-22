import pg from 'pg'
import config from '../config'

// Function to simplify using pg's client.query
export function query(query, bindings, callback) {
    // If no bindings were passed in.
    if (arguments.length === 2) {
        callback = bindings
        bindings = []
    }

    pg.connect(config.pg_connection_string, (err, client, done) => {
        if (err) {
            console.error(err)
            callback(err, null)
            client.end()
        } else {
            client.query(query, bindings, (err, result) => {
                if (err) {
                    callback(err, null)
                } else {
                    callback(null, result)
                    client.end()
                }
            })
        }
    })
}
