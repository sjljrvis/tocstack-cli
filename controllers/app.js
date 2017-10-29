const { makeRequest } = require('../helpers/internet')
const listAllApps = () => {
	makeRequest('/repositories', 'GET',{})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error)
  })
};

module.exports = {
	listAllApps
};