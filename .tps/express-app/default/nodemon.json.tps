{
	"watch": [
		"src",
		".env"
	],
	"ext": "json,{{#def.extension}}",
	{{{? tps.answers.typescript}}}
	"exec": "tsx",
	{{{?}}}
	"delay": "500"
}
