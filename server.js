var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Article = require('./models/Article.js');

var app = express();
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static('./public'));

mongoose.connect('mongodb://heroku_rg739nn4:j43h1mdkq8lp7nt79lgqhd1tus@ds019796.mlab.com:19796/heroku_rg739nn4');


var db = mongoose.connection;

db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
});

db.once('open', function() {
    console.log('Mongoose connected.');
});

app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
})

app.get('/api/saved', function(req, res) {

    Article.find({})
        .exec(function(err, doc) {

            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        })
});

app.post('/api/saved', function(req, res) {

    var newArticle = new Article({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url
    });

    newArticle.save(function(err, doc) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(doc);
        }
    });

});

app.delete('/api/saved/:id', function(req, res) {

    Article.find({ '_id': req.params.id }).remove()
        .exec(function(err, doc) {
            res.send(doc);
        });

});



app.listen(PORT, function() {
    console.log("Magic happening on port " + PORT);
});