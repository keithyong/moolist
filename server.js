var express = require('express');
var config = require('./config');
var pg = require('pg');
var path = require('path');
var app = express();
import { grabTodos, insertTodo } from './database/todo';

app.set('view engine', 'jade');

// Serve static content
app.use(express.static(path.join(__dirname, 'public')));
// React stuff
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = React.createFactory(require('./components/App.jsx').default);

var pg_err_handler = (res, err) => {
    res.status(500);
    res.send(err);
};

app.get('/', (req, res, next) => {
    grabTodos((err, rows) => {
        if (err) {
            pg_err_handler(err, res);
        } else {
            var reactHtml = ReactDOMServer.renderToString(<App todos={rows} />);
            res.render('index.jade', { reactOutput: reactHtml });
        }

    });
});

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
