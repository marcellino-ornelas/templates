(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[6121],{6121:e=>{e.exports={opts:{experimentalTemplateEngine:!0},prompts:[{name:"typescript",type:"confirm",tpsType:"data",message:"Would you like to use typescript",default:!1},{name:"extension",aliases:["e","ext","extention"],type:"input",tpsType:"data",message:"What type of extension do you want for your component?",default:e=>e.typescript?"tsx":"jsx"},{name:"css",aliases:["c"],type:"confirm",tpsType:"package",message:"Would you like to include a css file?",default:!0},{name:"cssType",aliases:["z"],tpsType:"data",type:"input",message:"What type of css extension would you like?",when:e=>!!e.css,default:"css"},{name:"test",aliases:["t"],type:"confirm",tpsType:"package",message:"Would you like to include unit tests?",default:!1},{name:"testType",aliases:["y"],tpsType:"data",type:"input",message:"What type of test extension would you like?",when:e=>!!e.test,default:e=>e.typescript?"test.ts":"test.js"},{name:"index",aliases:["i"],type:"confirm",tpsType:"package",message:"Would you like to include a index file?",default:!0},{name:"storybook",aliases:["s","story"],type:"confirm",tpsType:"package",message:"Would you like to include a storybook file?",default:!1}]}}}]);