let { makeRequest } = require('../helpers/internet')

var Spinner = require('cli-spinner').Spinner;
var spinner = new Spinner({
  text: chalk.magenta.bold('Loading.. %s'),
  stream: process.stderr,
  onTick: function (msg) {
    this.clearLine(this.stream);
    this.stream.write(msg);
  }
})
spinner.setSpinnerString(18);


const listAllApps = () => {
  spinner.start();
  makeRequest('/repositories', 'GET', {}, (error, result) => {
    if (error) {
      spinner.stop(1);
      console.log(chalk.red.bold('Error connecting to tocstack'))
    }
    else {
      spinner.stop(1);
      console.log(chalk.cyan.bold('-----Your apps-----'));
      result.forEach((element, index) => {
        console.log(chalk.cyan.bold(index + 1 + " " + element.repositoryName))
      });
    }
  })
};

const fetchAppLogs = (appName) => {
  spinner.start();
  makeRequest('/fetchlogs', 'GET', {}, (error, result) => {
    if (error) {
      spinner.stop(1);
      console.log(chalk.red.bold('Error connecting to tocstack'))
    }
    else {
      spinner.stop(1);
      console.log(chalk.cyan.bold('-----Logs-----'));
      // result.forEach((element, index) => {
      //   console.log(chalk.cyan.bold(index + 1 + " " + element.repositoryName))
      // });
      console.log(chalk.cyan(result))
    }
  })
};

module.exports = {
  listAllApps,fetchAppLogs
};