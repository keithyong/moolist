import pg from 'pg'
import pgErrHandler from './pgErrHandler'
import config from '../config'
import express from 'express'
import { grabTodos, insertTodo } from '../database/todo'
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

router.post('/todo', (req, res, next) => {
    insertTodo(req.body, (err, rows) => {
        if (err) {
            pgErrHandler(res, err)
        } else {
            res.status(200)
            res.send("Successfully posted a new todo.")
        }
    })
})

export default router
