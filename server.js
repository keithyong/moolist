var express = require('express');
var config = require('./config');
var pg = require('pg');
var app = express();

var pg_err_handler = (res, err) => {
    res.status(500);
    res.send(err);
};

app.get('/todo', (req, res, next) => {
    pg.connect(config.pg_connection_string, (err, client, done) => {
        if (err) {
            console.error(err);
            pg_err_handler(res, err);
        } else {
            client.query('SELECT * FROM todo', (err, result) => {
                if (err) {
                    pg_err_handler(res, err);
                } else {
                    res.status(200);
                    res.send(result.rows);
                }
            });
        }
    });
});

app.post('/check/:id', (req, res) => {
    pg.connect(config.pg_connection_string, (err, client, done) => {
        if (err) {
            console.error(err);
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
