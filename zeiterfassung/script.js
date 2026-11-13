let data = { 
    logEntries: [] 
}; 

let isTimeRunning = false;
let startTime;
let interval;

window.addEventListener("load", initialize);

function initialize() {
    document.getElementById("start-btn").addEventListener("click", startStopClicked);
   
    //Protokoll aus Web Storage auslesen (wenn vorhanden) 
    if (localStorage.getItem("time-log")) {
        data = JSON.parse(localStorage.getItem("time-log"));
        //Protokoll im Log (GUI) anzeigen 
        for (let i = 0; i < data.logEntries.length; i++) {
           addToLog(new Date(data.logEntries[i].from), new Date(data.logEntries[i].to), data.logEntries[i].task);
        }
    }
}


function startStopClicked() {
    document.getElementById("start-btn").classList.toggle("stop");
    document.getElementById("start-btn").classList.toggle("start");    
    
    if (!isTimeRunning) {
        //Startzeit merken 
        startTime = new Date() 
        //alle 1000 Millisekunden GUI updaten
        interval = setInterval(updateTimeCounter, 1000);
    } else {
        //Ausführung von setInterval() stoppen
        clearInterval(interval);
        interval = null;
        document.getElementById("time-counter").innerHTML = formatElapsedTime(0);
        addToLog(startTime, new Date(), document.getElementById("tasks-ddn").value);

        //Log-Eintrag für erfasste Zeit erstellen 
        const logEntry = {
        from: startTime,  
        to: new Date(),  
        task: document.getElementById("tasks-ddn").value, 
        };
        //Log-Eintrag ins logEntries-Array einfügen
        data.logEntries.push(logEntry);

        //erfasste Zeit in Web Storage speichern 
        localStorage.setItem("time-log", JSON.stringify(data));

        //erfasste zeit im Log (GUI) anzeigen (bestehende Zeile ersetzen) 
        addToLog(logEntry.from, logEntry.to, logEntry.task);
       //addToLog(startTime, new Date(), document.getElementById("tasks-ddn").value);

    }

    isTimeRunning = !isTimeRunning;
    document.getElementById("tasks-ddn").disabled = isTimeRunning;
}

function addToLog(from, to, task) {
    //neue Zeile
    const tr = document.createElement("tr");
    document.getElementById("log-tbl").appendChild(tr);

    //Datum
    let td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = (from.getDate() + "").padStart(2, "0") 
        + "." + ((from.getMonth() + 1) + "").padStart(2, "0") 
        + "." + from.getFullYear();
    
    //Zeit von-bis
    td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = (from.getHours() + "").padStart(2, "0") 
        + ":" + (from.getMinutes() + "").padStart(2, "0") 
        + ":" + (from.getSeconds() + "").padStart(2, "0")
        + " bis " 
        + (to.getHours() + "").padStart(2, "0") 
        + ":" + (to.getMinutes() + "").padStart(2, "0") 
        + ":" + (to.getSeconds() + "").padStart(2, "0")

    //Dauer
    td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = formatElapsedTime(to - from);
    
    //Aufgabe
    td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = task;
}

function updateTimeCounter() {
    document.getElementById("time-counter").innerHTML 
        = formatElapsedTime(new Date() - startTime);
}

function formatElapsedTime(elapsedTime) {
    let seconds = Math.floor(elapsedTime / 1000) % 60; 
    let minutes = Math.floor(elapsedTime / 1000 / 60) % 60; 
    let hours = Math.floor(elapsedTime / 1000 / 60 / 60); 

    return ("" + hours).padStart(2, "0")  
        + ":" + ("" + minutes).padStart(2, "0") 
        + ":" + ("" + seconds).padStart(2, "0");  
}