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

    setTimeout(function () {
        res.download(file)
    }, 5000);

});

app.post('/v2', async (req, res) => {
    console.log("=====INSIDE v2 PDF POST METHOD======")
    var result = await phantom.render2(req.body)
    console.log(result)
    const file = `/tmp/testo.pdf`;
    console.log('dirname testo', file)
    if (!file) {
        res.status(500).send('This has failed :c ')
    } else {
        console.log("downloading")
        res.status(200).sendFile(file,{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="testo.pdf"'
        })
    }

});

module.exports = app;

