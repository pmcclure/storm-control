const express = require('express');
const path = require('path');
var dn = require('dn');

var whoisLookup = require('./whois-server');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api/whois', (req, res) => {
	res.header("Access-Control-Allow-Origin", "https://stormcontrol.net");

	whoisLookup(req.query.whoisquery, function (returnValue) {
		if (typeof returnValue === 'string') {
			res.write(returnValue);
		}

		res.end();
	});
});

app.get('/api/dns', (req, res) => {
	res.header("Access-Control-Allow-Origin", "https://stormcontrol.net");

	dn.dig(req.query.dnsquery, function (err, returnValue) {
		if (!err) {
			res.write(JSON.stringify(returnValue));
		}
		else {
			console.log(err);
		}
		res.end();
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;