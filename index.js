#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('token');
global.db = db;
global.chalk = chalk;

const {
	login
} = require('./controllers/login');
const {
	listAllApps, fetchAppLogs, fetchAppStatus ,runAppCommand
} = require('./controllers/app');


const questions = [
	{
		type: 'input',
		name: 'email',
		message: chalk.cyan.bold('Email : ')
	},
	{
		type: 'input',
		name: 'password',
		hidden: true,
		message: chalk.cyan.bold('Password : ')
	}
];

program
	.version('0.0.1')
	.description('tocstack')

program
	.command('login')
	.description('tocstack login')
	.action(() => {
		console.log(chalk.cyan.bold('Enter your tocstack credentials'));
		prompt(questions).then((answers) =>
			login(answers)
		);
	});

program
	.command('apps')
	.alias('l')
	.description('list all your apps')
	.action(() => {
		listAllApps()
	});

program
	.command('logs <appName>')
	.description('See log details of your app')
	.action(appName => {
		fetchAppLogs(appName)
	});

program
	.command('status <appName>')
	.description('See current details of your app')
	.action(appName => {
		fetchAppStatus(appName)
	});

program
	.command('run <appName> <command>')
	.description('run unix command inside your app container')
	.action((appName,command) => {
		runAppCommand(appName,command)
	});
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
	program.outputHelp();
	process.exit();
}
program.parse(process.argv)