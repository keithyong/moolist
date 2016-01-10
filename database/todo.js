import pg from 'pg';
import config from '../config';

export function grabTodos(callback) {
    pg.connect(config.pg_connection_string, (err, client, done) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            client.query('SELECT * FROM todo', (err, result) => {
                if (err) {
                    pg_err_handler(res, err);
                } else {
                    callback(null, result.rows);
                }
            });
        }
    });
};

export function insertTodo(text, callback) {
    pg.connect(config.pg_connection_string, (err, client, done) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            client.query('INSERT INTO todo(text) VALUES ($1)', [text], (err, result) => {
                if (err) {
                    pg_err_handler(res, err);
                } else {
                    callback(null, result.rows);
                }
            });
        }
    });
};
