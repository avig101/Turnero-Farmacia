const meses = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
const farmacias = [["PUSSETTO","Belgrano 402",421004],["MOLINA","Zeballos 303",452357]];
let deTurno = [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let numberOfWeeks = 6;
let numFarmacias = 2

let week = [document.getElementById("week1"),document.getElementById("week2"),document.getElementById("week3"),document.getElementById("week4"),document.getElementById("week5"),document.getElementById("week6")];

let mes = document.getElementById("mes");
let año = document.getElementById("año");
let dias = [];

mes.addEventListener('click',()=>changeMonth());

setYear(currentYear);
setMonth(currentMonth);

makeTurnero();
makeFunctional();




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
    makeTurnero();
}

function changeTurno(dia){
    if(deTurno[dia] === (numFarmacias)){
        deTurno[dia] = 0;
    }else {
        deTurno[dia]++;
    }
    
    makeTurnero();
}
function makeTurnero(){
    let daytowrite = startDay();
    let dia = 1;
    for(let i=0;i<numberOfWeeks;i++){
        week[i].innerHTML = ` `;
        for(let j= 0;j<7;j++){
            if((i===0 && j<daytowrite) || (dia>numbDays())){
                week[i].innerHTML += `<td></td>`;
            }else{
                if(deTurno[dia]===0){
                    week[i].innerHTML += `<td>
                                            <ul id = "dia${dia}" class = "lista_dia select">
                                                <li class = "numeros azul">${dia}</li>
                                                <li class = "empty azul" >Seleccione</li>
                                                <li class = "empty azul" >una</li>
                                                <li class = "empty azul" >farmacia</li>
                                            </ul>
                                        </td>`;
                }else{
                    week[i].innerHTML += `<td>
                                            <ul id = "dia${dia}" class = "lista_dia select">
                                                <li class = "numeros azul">${dia}</li>
                                                <li class = "nombres verde">${farmacias[deTurno[dia]-1][0]}</li>
                                                <li class = "datos azul" >${farmacias[deTurno[dia]-1][1]}</li>
                                                <li class = "datos azul" >TEL: ${farmacias[deTurno[dia]-1][2]}</li>
                                            </ul>
                                        </td>`;
                }
                dia++;
            }
        }
    }
    makeFunctional();
}

function makeFunctional(){
    for(let i = 1;i<numbDays();i++){
        dias[i] = document.getElementById("dia"+i.toString());
        dias[i].addEventListener('click',()=>changeTurno(i));
    }
}

