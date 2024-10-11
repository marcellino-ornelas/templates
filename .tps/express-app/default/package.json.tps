{
	"name": "default",
	"version": "1.0.0",
	"description": "",
	"type": "module",
	{{{? tps.answers.typescript }}}
	"main": "dist/app.js",
	{{{??}}}
	"main": "src/app.js",
	{{{?}}}
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		{{{? tps.answers.typescript }}}
		"start": "node dist/app.js",
		"build": "tsc",
		"dev": "tsc && nodemon dist/app.js",
		"serve": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/app.ts"
		{{{??}}}
		"start": "node src/app.js",
		"dev": "nodemon src/app.js"
		{{{?}}}
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"dependencies": {
		"body-parser": "^1.20.3",
		"compression": "^1.7.4",
		"cookie-parser": "^1.4.6",
		"cors": "^2.8.5",
		"dotenv": "^16.4.5",
		"express": "^4.21.0",
		"express-rate-limit": "^7.4.0",
		"express-validator": "^7.2.0",
		"helmet": "^7.1.0",
		"morgan": "^1.10.0",
		"winston": "^3.14.2"
	},
	"devDependencies": {
		{{{? tps.answers.typescript }}}
		"@types/express": "^5.0.0",
		"@types/node": "^22.7.5",
		"typescript": "^5.6.3",
		{{{?}}}
		"nodemon": "^3.1.7"
	}
}
