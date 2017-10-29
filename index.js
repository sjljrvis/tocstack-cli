#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('token');

global.db = db;

const {
  login
} = require('./controllers/commands');

const questions = [
  {
    type: 'input',
    name: 'email',
    message: chalk.cyan.bold('Email : ')
  },
  {
    type: 'hidden',
    name: 'password',
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

// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv)