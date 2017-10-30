let { makeRequest } = require('../helpers/internet')
const listAllApps = () => {
  makeRequest('/repositories', 'GET', {} , (error,result) =>{
    if(error){
      console.log(chalk.red.bold('Error connecting to tocstack'))
    }
    else{
      console.log(result);
    }
  })
};

module.exports = {
  listAllApps
};