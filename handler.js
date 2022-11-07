// app.js

const sls = require('serverless-http')
const app = require('./index')
module.exports.server = sls(app)