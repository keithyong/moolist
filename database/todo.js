import pg from 'pg'
import config from '../config'
import { query } from './query'

export function grabTodos(callback) {
    query('SELECT * FROM todo ORDER BY completed, completion_time ASC, id DESC', (err, result) => {
        callback(err, result.rows);
    });
}

export function insertTodo(text, callback) {
    query('INSERT INTO todo(text) VALUES ($1)', [text], (err, result) => {
        callback(err, result.rows)
    })
}
