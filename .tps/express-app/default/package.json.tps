{
	"name": "default",
	"version": "1.0.0",
	"description": "",
	"type": "module",
	{{{? tps.answers.typescript }}}
	"main": "dist/server.js",
	{{{??}}}
	"main": "src/server.js",
	{{{?}}}
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		{{{? tps.answers.typescript }}}
		"build": "tsc",
		"dev": "tsx src/server.ts",
		"start": "node dist/server.js",
		"typecheck": "tsc --noEmit"
		{{{??}}}
		"start": "node src/server.js",
		"dev": "nodemon src/server.js"
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
		{{{? tps.answers.database === 'mongoose' }}}
		"mongoose": "^8.8.1",
		{{{?}}}
		"morgan": "^1.10.0",
		"winston": "^3.14.2"
	},
	"devDependencies": {
		{{{? tps.answers.typescript }}}
		"tsx": "^4.19.3",
		"@types/compression": "^1.7.5",
		"@types/cookie-parser": "^1.4.7",
		"@types/cors": "^2.8.17",
		"@types/express": "^5.0.0",
		"@types/morgan": "^1.9.9",
		"@types/node": "^22.7.5",
		"typescript": "^5.6.3",
		{{{?}}}
		"nodemon": "^3.1.7"
	}
}