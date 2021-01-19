const delay = (d)=>{
    return new Promise((res,rej)=>{
        setTimeout(res,d);
    });
}

const terminal = document.getElementById("terminal");
const lineLimit = 100;
const addLine = (newLine)=>{
    let lineArr = terminal.innerText.split("\n");
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
];

(async ()=>{
    const scpDbResponse = await fetch("./scpDb.json");
    const scpDb = await scpDbResponse.json();
    while(true){
        const secondsToWait = Math.random()*60 + 10;
        await delay(secondsToWait*1000);
        const randomSCP = scpDb[Math.floor(Math.random()* scpDb.length)];
        const randomTemplate = messageTemplates[Math.floor(Math.random()*messageTemplates.length)];
        addLine(randomTemplate(randomSCP));
    }
})();
