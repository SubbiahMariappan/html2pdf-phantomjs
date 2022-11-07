var express = require('express');
var phantom = require('./phantom.js');
const bodyParser = require('body-parser')
var app = express();
var PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("=====App INITIALISED======")

app.get('/', (req, res) => {
    console.log("=====INSIDE GET METHOD======")

    res.send('Service running');
});

app.post('/', (req, res) => {
    console.log("=====INSIDE PDF POST METHOD======")

    // var pdf contains the promise, when resolved true if success, false if otherwise
    var pdf = phantom.render(req.body);
    const file = `${__dirname}/test.pdf`;

    setTimeout(function(){
        res.download(file)
    },5000);

});

module.exports = app;

