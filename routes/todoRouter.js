import pg from 'pg'
import pgErrHandler from './pgErrHandler'
import config from '../config'
import express from 'express'
let router = express.Router()

router.get('/todo', (req, res, next) => {
    grabTodos((err, rows) => {
        if (err) {
            pgErrHandler(res, err)
        } else {
            res.status(200)
            res.send(result.rows)
        }
    })
})

router.post('/todo/:text', (req, res, next) => {
    insertTodo(req.params.text, (err, rows) => {
        if (err) {
            pgErrHandler(res, err)
        } else {
            res.status(200)
            res.send("Successfully posted a new todo.")
        }
    })
})

export default router
