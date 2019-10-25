const express = require('express');
const path = require('path');
const app = express();
const test = require('./lib/Test')
const cors = require('cors')
const url = require('url')
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log(process.env.API_PORT)
app.get('/findwifi', function(req, res) {
    const query = url.parse(req.url, true).query
    test()
        .then(data => {
            const payloadString = JSON.stringify(data)
            // console.log(payloadString)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(payloadString)

        })
        .catch(err => console.log(err))
})
app.listen(process.env.API_PORT);