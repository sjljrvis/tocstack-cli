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


const createApp = (appName) => {
	spinner.start();
	makeRequest('/createrepository', 'POST',
		{
			repositoryName: appName,
		}, (error, result) => {
			if (error && result == null) {
				spinner.stop(1);
				console.log(chalk.red.bold('Error connecting to tocstack'))
			}
			else if (error && result == "token not found") {
				spinner.stop(1);
				console.log("\n");
				console.log(chalk.red.bold('Login first :('));
				console.log(chalk.green.bold('Use  "tocstack login" to start session'));
			}
			else if (result.message == "Repository already exists please choose another name") {
				spinner.stop(1);
				console.log(chalk.red.bold(`${result.message} :(`));
			}
			else {
				spinner.stop(1);
				console.log(chalk.cyan.bold('App added successfully'));
			}
		})
};

const listAllApps = () => {
	spinner.start();
	makeRequest('/repositories', 'GET', {}, (error, result) => {
		if (error && result == null) {
			spinner.stop(1);
			console.log(chalk.red.bold('Error connecting to tocstack'))
		}
		else if (error && result == "token not found") {
			spinner.stop(1);
			console.log("\n");
			console.log(chalk.red.bold('Login first :('));
			console.log(chalk.green.bold('Use  "tocstack login" to start session'));
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
	makeRequest(`/fetchlogs/${appName}`, 'GET', {}, (error, result) => {
		if (error) {
			spinner.stop(1);
			console.log(chalk.red.bold('Error connecting to tocstack'))
		}
		else {
			spinner.stop(1);
			console.log(chalk.cyan.bold('-----Logs-----'));
			if (result) {
				console.log(chalk.cyan(result))
			}
			else {
				console.log(chalk.cyan.bold("Logs:") + " " + chalk.red.bold("Error !! please try again later"));
			}
		}
	})
};


const fetchAppStatus = (appName) => {
	spinner.start();
	makeRequest(`/monitorcontainer?containerName=${appName}docker_web_1`, 'GET', {}, (error, result) => {
		if (error) {
			spinner.stop(1);
			console.log(chalk.red.bold('Error connecting to tocstack'))
		}
		else {
			spinner.stop(1);
			console.log(chalk.cyan.bold('-----status-----'));
			if (result[0]) {
				console.log(chalk.cyan.bold("Status:") + " " + chalk.cyan(result[0].State.Status));
				console.log(chalk.cyan.bold("Process ID:") + " " + chalk.cyan(result[0].State.Pid));
				console.log(chalk.cyan.bold("MAC address:") + " " + chalk.cyan(result[0].NetworkSettings[`${appName}docker_default`] ? result[0].NetworkSettings[`${appName}docker_default`].MacAddress : 0 ));
				console.log(chalk.cyan.bold("IP address:") + " " + chalk.cyan(result[0].NetworkSettings[`${appName}docker_default`] ? result[0].NetworkSettings[`${appName}docker_default`].IPAddress : 0 ))
			}
			else {
				console.log(chalk.cyan.bold("Status:") + " " + chalk.red.bold("Error !! please try again later"));
			}
		}
	})
};

const runAppCommand = (appName, command) => {
	spinner.start();
	makeRequest(`/executeCommand`, 'POST',
		{
			containerName: `${appName}docker_web_1`,
			command: command
		}, (error, result) => {
			if (error) {
				spinner.stop(1);
				console.log(chalk.red.bold('Error connecting to tocstack'))
			}
			else {
				spinner.stop(1);
				console.log(chalk.cyan.bold(result));
			}
		})
};

module.exports = {
	listAllApps, fetchAppLogs, fetchAppStatus, runAppCommand, createApp 
};