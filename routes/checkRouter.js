import pg from 'pg'
import pgErrHandler from './pgErrHandler'
import config from '../config'
import express from 'express'
let router = express.Router()

router.post('/check/:id', (req, res) => {
    pg.connect(config.pg_connection_string, (err, client, done) => {
        if (err) {
            pgErrHandler(res, err)
            client.end()
        } else {
            client.query('UPDATE todo SET completed = NOT completed WHERE todo.id=$1', [req.params.id], (err, result) => {
                if (err) {
                    pgErrHandler(res, err)
                    client.end()
                } else {
                    res.status(200)
                    res.send('Successfully checked/unchecked todo item.')
                    client.end()
                }
            })
        }
    })
})

export default router;
