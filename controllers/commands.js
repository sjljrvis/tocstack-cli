const { makeRequest } = require('../helpers/internet')
const login = (loginPayload) => {
	makeRequest('/login', 'POST', loginPayload)
		.then((result) => {
			console.log(result);
			db.serialize(() => {
				db.run("CREATE TABLE IF NOT EXISTS token(userEmail TEXT, token TEXT ,date TEXT)")
				let stmt = db.prepare("INSERT INTO token VALUES (?,?,?)");
				let date = new Date().toLocaleTimeString();
				let token = result.data.token;
				let userEmail = result.data.email;
				stmt.run(userEmail,token,date);
				stmt.finalize();
				db.each("SELECT userEmail,token,date FROM token",(err, row) =>{
					console.log("================================================")
					console.log("Notes : \n" + row.userEmail + "\n" + row.token + "\n" + row.date + "\n");
					console.log("================================================")
			});
			})
		})
		.catch((error) => {
			console.log(error)
		})
};

module.exports = {
	login,
};