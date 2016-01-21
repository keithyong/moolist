var express = require('express');
var config = require('./config');
var pg = require('pg');
var path = require('path');
var app = express();
import { grabTodos, insertTodo } from './database/todo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers/todo';
import { renderToString } from 'react-dom/server';


app.set('view engine', 'jade');

// Serve static content
app.use(express.static(path.join(__dirname, 'public')));
// React stuff
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = React.createFactory(require('./components/App.jsx').default);

app.use(handleRender);

var pg_err_handler = (res, err) => {
    res.status(500);
    res.send(err);
};

function renderFullPage(html, initialState) {
    return `
        <!doctype html>
        <html>
            <head>
                <title>Redux Universal Example</title>
            </head>
        <body>
        <div id="app">${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
            </body>
        </html>
        `
}

function handleRender(req, res) {
    let initialState

    grabTodos((err, rows) => {
        if (err) {
            pg_err_handler(err, res);
        } else {
            // Make initial state equal to database data
            initialState = rows;
            const store = createStore(todoApp, initialState)
            const html = renderToString(
                <Provider store={store}>
                    <App />
                </Provider>
            )
            res.send(renderFullPage(html, initialState))
        }
    });
}
  
app.get('/todo', (req, res, next) => {
    grabTodos((err, rows) => {
        if (err) {
            pg_err_handler(res, err);
        } else {
            res.status(200);
            res.send(result.rows);
        }
    });
});

app.post('/todo/:text', (req, res, next) => {
    insertTodo(req.params.text, (err, rows) => {
        if (err) {
            pg_err_handler(res, err);
        } else {
            res.status(200);
            res.send("Successfully posted a new todo.");
        }
    });
});

app.post('/check/:id', (req, res) => {
    pg.connect(config.pg_connection_string, (err, client, done) => {
        if (err) {
            pg_err_handler(res, err);
        } else {
            client.query('UPDATE todo SET completed = NOT completed WHERE todo.id=$1', [req.params.id], (err, result) => {
                if (err) {
                    pg_err_handler(res, err);
                } else {
                    res.status(200);
                    res.send('Successfully checked/unchecked todo item.');
                }
            });
        }
    });
});

app.listen(config.port);
console.log('Listenining on port ' + config.port);
