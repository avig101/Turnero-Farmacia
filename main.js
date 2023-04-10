const meses = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
const farmacias = [["Ingrese","una","farmacia"]["PUSSETTO","Belgrano 402","421004"],["MOLINA","Zeballos 303", 452357]];
let deTurno = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let numberOfWeeks = 3;

let week = [document.getElementById("week1"),document.getElementById("week2"),document.getElementById("week3")];
let week1 = document.getElementById("week1"); // ADonde escribimos los dias
let week2 = document.getElementById("week2")
let week3 = document.getElementById("week3")
let week4 = document.getElementById("week4")
let week5 = document.getElementById("week5")
let week6 = document.getElementById("week6")
let mes = document.getElementById("mes");
let año = document.getElementById("año");

mes.addEventListener('click',()=>changeMonth());

setYear(currentYear);
setMonth(currentMonth);

makeTurnero();



function setMonth(month){
    currentMonth = month;
    mes.textContent = meses[month];
    console.log(numbDays());
}

function setYear(year){
    currentYear = year;
    año.textContent =year.toString();
    console.log(numbDays());
}

function isLeap(){
    return ((currentYear % 4 === 0 ));
}

function startDay(){
    let start = new Date(currentYear,currentMonth,1);
    return start.getDay();
}
function numbDays(){
    if(currentMonth%2 === 0){
        return 31;
    }else if(currentMonth == 1){
        if(isLeap == true){
            return 29;
        }else return 28;
    }else return 30;
}

function changeMonth(){
    if(currentMonth !== 11){
        setMonth(currentMonth+1)
    }else setMonth(0);

    console.log("Anda piolita");
}
function makeTurnero(){
    let daytowrite = startDay();
    for(let i=0;i<numberOfWeeks;i++){
        for(let j =0;j<7;j++){
            week[i].innerHTML += '<td>HOLA</td>';
        }
    }
}