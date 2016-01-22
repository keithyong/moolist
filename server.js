import express from 'express'
import config from './config'
import pg from 'pg'
import path from 'path'
import { grabTodos, insertTodo } from './database/todo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todoApp from './reducers/todo'
import { renderToString } from 'react-dom/server'

let app = express()

// Serve static content
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dist')))

// React stuff
import React from 'react'
import ReactDOMServer from 'react-dom/server'
let App = React.createFactory(require('./components/App.jsx').default)


let pg_err_handler = (res, err) => {
    res.status(500)
    res.send(err)
}

function renderFullPage(html, initialState) {
    return `
        <!doctype html>
        <html>
            <head>
                <title>Keith\'s Todo List</title>
                <link rel="stylesheet" type="text/css" href="/css/style.css">
            </head>
        <body>
        <div id="app">${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/bundle.js"></script>
            </body>
        </html>
        `
}

function handleRender(req, res) {
    let initialState

    console.log('+-Server Rendering-+ Received request')
    grabTodos((err, rows) => {
        console.log("+-Server Rendering-+ grabTodos callback")
        if (err) {
            pg_err_handler(err, res)
        } else {
            console.log('+-Server Rendering-+ Grabbed DB data')
            // Make initial state equal to database data
            initialState = rows
            const store = createStore(todoApp, initialState)
            const html = renderToString(
                <Provider store={store}>
                    <App />
                </Provider>
            )
            res.send(renderFullPage(html, initialState))
            console.log('+-Server Rendering-+ Success!')
            console.log(' ')
        }
    })
}

app.get('/', handleRender);
app.get('/todo', (req, res, next) => {
    grabTodos((err, rows) => {
        if (err) {
            pg_err_handler(res, err)
        } else {
            res.status(200)
            res.send(result.rows)
        }
    })
})

app.post('/todo/:text', (req, res, next) => {
    insertTodo(req.params.text, (err, rows) => {
        if (err) {
            pg_err_handler(res, err)
        } else {
            res.status(200)
            res.send("Successfully posted a new todo.")
        }
    })
})
app.post('/check/:id', (req, res) => {
    pg.connect(config.pg_connection_string, (err, client, done) => {
        if (err) {
            pg_err_handler(res, err)
        } else {
            client.query('UPDATE todo SET completed = NOT completed WHERE todo.id=$1', [req.params.id], (err, result) => {
                if (err) {
                    pg_err_handler(res, err)
                } else {
                    res.status(200)
                    res.send('Successfully checked/unchecked todo item.')
                }
            })
        }
    })
})

app.listen(config.port)
console.log('Listenining on port ' + config.port)
