const request = require('request');
const url = 'http://localhost:5555'
module.exports.makeRequest = (endpoint, method, payload =null) => {
  setRequestHeader((err, token) => {
    console.log(err,token)
    if (err) {
      console.log(err)
      // console.log('Login first');
      // return;
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
      return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          console.log(error, body)
          if (error) {
            reject({ error: true, data: body });
          }
          if (response.statusCode == 200) {
            resolve({ error: false, data: body });
          };
        })
      })
    }
  })
}


var setRequestHeader = (callback) => {
  db.each("SELECT userEmail,token,date FROM token", (err, row) => {
    console.log(err,row)
    if (err) {
      callback(true, null);
    }
    else {
      callback(false, row.token.toString());
    }
  });
}