let { makeRequest } = require('../helpers/internet')
var Spinner = require('cli-spinner').Spinner;
var spinner = new Spinner({
  text: chalk.magenta.bold('Loading.. %s'),
  stream: process.stderr,
  onTick: function(msg){
      this.clearLine(this.stream);
      this.stream.write(msg);
  }
})
spinner.setSpinnerString(18);
const listAllApps = () => {
  spinner.start();
  makeRequest('/repositories', 'GET', {} , (error,result) =>{
    if(error){
      console.log(chalk.red.bold('Error connecting to tocstack'))
    }
    else{
      spinner.stop(1);
      console.log(chalk.cyan.bold('-----Your apps-----'));
      result.forEach((element,index) => {
        console.log(chalk.cyan.bold(index+1+" "+element.repositoryName))
      });
    }
  })
};

module.exports = {
  listAllApps
};