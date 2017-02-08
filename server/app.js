const express = require('express');
const path = require('path');

var whoisLookup = require('./whois-server');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api/whois', (req, res) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	
	whoisLookup(req.query.whoisquery, function (returnValue) {
        if (typeof returnValue === 'string') {
            res.write(returnValue);
        }
		
		res.end();
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;

