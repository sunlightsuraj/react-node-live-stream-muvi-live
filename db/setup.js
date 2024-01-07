const fs = require("node:fs");

module.exports = () => {
	(new Promise((rs, rj) => {
		fs.access(process.env.DB_FILE, fs.constants.R_OK, (err) => {
			if (err) {
				fs.writeFile(process.env.DB_FILE, "", (err) => {
					if (err) rj(err);
		
					console.log("DB file created!");
					rs(true);
				})
			} else {
				console.log("DB file exists!");
				rs(true);
			}
		});
	})).then(() => {
		require("./index");
	})
}