import express from 'express'
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

let app = express()

// Serve static content
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dist')))

// React stuff
import React from 'react'
import ReactDOMServer from 'react-dom/server'
let App = React.createFactory(require('./components/App.jsx').default)


function renderFullPage(html, initialState) {
    return `
        <!doctype html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>${config.app_title}</title>
                <link rel="stylesheet" type="text/css" href="/css/style.css">
                <link href='https://fonts.googleapis.com/css?family=Droid+Sans+Mono' rel='stylesheet' type='text/css'>
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
}

app.get('/', handleRender);
app.use(todoRouter);
app.use(checkRouter);

app.listen(config.port)
