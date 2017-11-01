let { makeRequest } = require('../helpers/internet')
const login = (loginPayload) => {
	makeRequest('/login', 'POST', loginPayload, (error, result) => {
		if (error && result == null) {
			console.log(chalk.cyan.bold('Error connecting to tocstack'))
		}
		else if(error && result == "Authetication failure"){
			console.log(chalk.red.bold('Fatal Authentication'))
		}
		else {
			db.serialize(() => {
				db.run("CREATE TABLE IF NOT EXISTS token(userEmail TEXT, token TEXT ,date TEXT)")
				db.run('DELETE from token')
				let stmt = db.prepare("INSERT INTO token VALUES (?,?,?)");
				let date = new Date().toLocaleTimeString();
				let token = result.token;
				let userEmail = result.email;
				stmt.run(userEmail, token, date);
				stmt.finalize();
				db.each("SELECT userEmail,token,date FROM token", (err, row) => {
					console.log("================================================")
					console.log("Token store : \n" + row.userEmail + "\n" + row.token + "\n" + row.date + "\n");
					console.log("================================================")
				});
			});
		}
	})
};

module.exports = {
	login,
};