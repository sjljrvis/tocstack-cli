const request = require('request');
const url = 'http://localhost:5555'
module.exports.makeRequest = (endpoint,method,payload) =>{

  let options = {
    method: method,
    uri: url+`${endpoint}`,
    body: payload,
    json: true
  }

  return new Promise((resolve,reject) =>{
    request(options, (error, response, body) => {
      if (error) {
        reject({error: true , data : body});
      }
      if(response.statusCode == 200){
        resolve({error:false , data : body});
      };
    })
  })
}