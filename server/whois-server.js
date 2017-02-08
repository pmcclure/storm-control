var whois = require('node-whois');

function whoisLookup(input, callback) {
	whois.lookup(input, function (err, data) {
		callback(data)
	})
}

module.exports = whoisLookup;
