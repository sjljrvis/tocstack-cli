const request = require('request');
const url = 'http://localhost:5555'
module.exports.makeRequest = (endpoint, method, payload = null,callback) => {
	setRequestHeader(endpoint, (err, token) => {
		if (err) {
			console.log('Login first');
			return;
		}
		else {
			let options = {}
			if (endpoint == "/login") {
				options = {
					method: method,
					uri: url + `${endpoint}`,
					body: payload,
					json: true
				}
			}
			else if (method == "GET") {
				options = {
					method: method,
					headers: { "Authorization": "Bearer " + token },
					uri: url + `${endpoint}`,
					json: true
				}
			}
			else {
				options = {
					method: method,
					headers: { "Authorization": "Bearer " + token },
					uri: url + `${endpoint}`,
					body: payload,
					json: true
				}
			}
			request(options, (error, response, body) => {
				if (error) {
					return callback(true, body);
				}
				if (response.statusCode == 200) {
					callback(false, body);
				};
			})
		}
	})
}


var setRequestHeader = (endpoint, callback) => {
	if (endpoint == '/login') {
		callback(false, "dummytoken");
	}
	else {
		db.each("SELECT userEmail,token,date FROM token", (err, row) => {
			if (err) {
				callback(true, null);
			}
			else {
				callback(false, row.token.toString());
			}
		});
	}
}