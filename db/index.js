"use strict";
const fs = require("node:fs");
var dbConnected = false;
var dbFile = {};

const readDB = () => {
	if (!dbConnected) {
		fs.readFile(process.env.DB_FILE, { encoding: "UTF-8" }, (err, data) => {
			if (err) throw err;
			
			try {
				if (data) {
					dbFile = JSON.parse(data);
					dbConnected = true;
				}
			} catch (err) {
				console.error('DB json reading error', err);
			}
		});
	}
}

readDB();

const writeDb = (data) => {
	fs.writeFile(process.env.DB_FILE, JSON.stringify(data), { encoding: "utf-8" }, (err) => {
		if (err) throw err;

		console.log("File saved!");
	});
}

module.exports = {
	db: () => dbFile,
	writeDb
};