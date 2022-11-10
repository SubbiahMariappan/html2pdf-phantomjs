var express = require('express');
var phantom = require('./phantom.js');
const bodyParser = require('body-parser')
var app = express();

//test, delete later
const execFile = require('child_process').execFile

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

app.post('/v2', (req, res) => {
    console.log("=====INSIDE v2 PDF POST METHOD======")
    phantom.render2(req.body);
    const file = `${__dirname}/testo.pdf`;

    console.log('dirname testo', file)

    setTimeout(function(){
        execFile('ls', ['-la'], (err, stdout, stderr) => {
        console.log('checking files in here')
        console.log(stdout)
        console.log(stderr)
      })
    },4000);

    setTimeout(function(){
        if (!file){
            res.status(500).send('This has failed :c ')
        }else {
            res.status(200).download(file)
        }
    },5000);
    
});

module.exports = app;

