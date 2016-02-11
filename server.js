import express from 'express'
import bodyParser from 'body-parser'
import config from './config'
import pg from 'pg'
import path from 'path'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todoApp from './reducers/todo'
import { renderToString } from 'react-dom/server'
import { grabTodos } from './database/todo'
import todoRouter from './routes/todoRouter'
import checkRouter from './routes/checkRouter'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

let app = express()
let App = React.createFactory(require('./components/App.jsx').default)

app.use(bodyParser.text())
app.use(todoRouter)
app.use(checkRouter)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dist')))

function renderFullPage(html, initialState) {
    return `
        <!doctype html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>${config.app_title}</title>
                <link rel="stylesheet" type="text/css" href="/css/style.css">
                <link href='https://fonts.googleapis.com/css?family=Ubuntu:400,300' rel='stylesheet' type='text/css'>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
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

app.get('/', (req, res) => {
    let initialState

    grabTodos((err, rows) => {
        if (err) {
            pg_err_handler(err, res)
        } else {
            // Make initial state equal to database data
            initialState = rows
            const store = createStore(todoApp, initialState)
            const html = renderToString(
                <Provider store={store}>
                    <App />
                </Provider>
            )
            res.send(renderFullPage(html, initialState))
        }
    })
})

console.log('Listening on port ' + config.port)
app.listen(config.port)
