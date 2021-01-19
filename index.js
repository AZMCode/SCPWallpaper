import delay from 'https://cdn.skypack.dev/delay';
import * as scpDb from './scpDb.json';

const terminal = document.getElementById("terminal");
const lineLimit = 100;
const addLine = (newLine)=>{
    const lineArr = terminal.innerText.split("\n");
    lineArr.push(newLine);
    lineArr = lineArr.slice(0,100);
    terminal.innerText = lineArr.join("\n");
}

const messageTemplates = [
    function(){
        const site = Math.floor(Math.random()*5)+15;
        const hall = Math.floor(Math.random()*7);
        return `Site-${site}: Cleanup required on hall ${hall}.`
    },
    function(scp){
        return `Lecture on SCP-${scp[0]} starting in Auditorium`
    },
    function(scp){
        return `Accident related to SCP-${scp[0]} ongoing. Be advised.`
    }
]

(async()=>{
    while(true){
        const secondsToWait = Math.random()*10 + 2;
        await delay(secondsToWait*1000);
        const randomSCP = scpDb[Math.floor(Math.random()* scpDb.length)];
        const randomTemplate = messageTemplates[Math.floor(Math.random()*scpDb.length)];
        addLine(randomTemplate(randomSCP));
    }
})();
