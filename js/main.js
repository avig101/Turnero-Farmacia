// Se enlistan los meses
const meses = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO",
                "AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];

// Se enlistan las farmacias
const farmacias = [ ["PUSSETTO","Belgrano 402",421004],["MOLINA","Zeballos 303",452357],
                ["VANDENBERGHE","Illia 596",426786],["CAULA","Ameghino 314",452357],
                ["FENOGLIO","Zeballos esq Crespo",426602],["CAGLIERO","Zeballos 570",421772],
                ["GARIONE","9 de Julio 21",421844],["AIRASCA","Yrigoyen 1180",423556],
                ["ROBLEDO","Alem 407",427071], ["GHIONE","San Martín 45",453400],
                ["ROSSO","Italia 574",426435],["ASTESANA","Mitri 346",420723]];

// Se crea la calse farmacia
class farmacia {
    #nombre;
    #direc;
    #tel;
    constructor(nombre,direc,tel){
        this.#nombre = nombre;
        this.#direc = direc;
        this.#tel = tel;
    }
    getName(){
        return this.#nombre;
    }
    getDir(){
        return this.#direc;
    }
    getTel(){
        return this.#tel;
    }
    setName(nombre){
        this.#nombre = nombre;
    }
    setDir(direccion){
        this.#direc = direccion;
    }
    setTel(telefono){
        this.#tel = tel;
    }
}
let numFarmacias = farmacias.length;
let farmacias_class = [];

//Se crea la clase dia
class dia{
    #nro;
    #deTurno = 0;
    #ref;
    constructor(numero){
        this.#nro = numero;
        this.#deTurno = 0;
    }
    getNum(){
        return this.#nro;
    }
    getTurno(){
        return this.#deTurno;
    }
    getRef(){
        return this.#ref;
    }
    setNum(numero){
        this.#nro = numero;
    }
    setTurno(farmacia){
        this.#deTurno = farmacia;
    }
    setRef(referencia){
        this.#ref = referencia;
    }
}

//Lugares donde se guardaran las referencias
//Botones
let dias = [];
let mes,año,mesQuery,añoQuery;
// Partes del documento
let topCalendar;



// Se inicializa la fecha
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Se inicaliza el arreglo de semanas
let week = [document.getElementById("week1"),document.getElementById("week2"),document.getElementById("week3"),
            document.getElementById("week4"),document.getElementById("week5"),document.getElementById("week6")];
let numWeeks = week.length;

// Se inicializan los botones
let print = document.getElementById("print");
print.addEventListener(`click`,()=>window.print());

// Se inicializa el turnero
makeObjs();
makeTurnero();
makeTop();
makeFunctional();
//pruebas();


// Funciones


// Años
function setYear(year){
    currentYear = year;
    makeTurnero();
    makeFunctional();
}
function isLeap(){
    return ((currentYear % 4 === 0 ));
}

// Meses
function setMonth(month){
    currentMonth = month
    makeTurnero();
    makeFunctional();
}

//Dias
function startDay(){
    let start = new Date(currentYear,currentMonth,1);
    return start.getDay();
}

function numDays(){
    if(currentMonth%2 === 0){
        return 31;
    }else if(currentMonth == 1){
        if(isLeap == true){
            return 29;
        }else return 28;
    }else return 30;
}

// Objetos
function makeObjs(){
    farmacias_class[0] = new farmacia(farmacias[0][0],farmacias[0][1],farmacias[0][2]);
    for(let i=1;i<=31;i++){
        dias[i] = new dia(i);
        if(i<numFarmacias){
            farmacias_class[i] = new farmacia(farmacias[i][0],farmacias[i][1],farmacias[i][2]);
        }
    }

}
// Funcionalidades
function makeFunctional(){
    for(let i = 1;i<=numDays();i++){
        dias[i].setRef(document.getElementById("dia"+(i.toString())));
        dias[i].getRef().addEventListener('click',()=>changeTurno(i));
    }
}
function makeTurnero(){
    let daytowrite = startDay();
    let day = 1;
    for(let i=0;i<numWeeks;i++){
        week[i].innerHTML = ` `;
        for(let j= 0;j<7;j++){
            if((i===0 && j<daytowrite) || (day>numDays())){
                week[i].innerHTML += `<td></td>`;
            }else{
                if(dias[day].getTurno() === 0){
                    week[i].innerHTML += `<td>
                                            <ul id = "dia${dias[day].getNum()}" class = "lista_dia select">
                                                <li class = "numeros azul">${dias[day].getNum()}</li>
                                                <li class = "empty azul" >Seleccione</li>
                                                <li class = "empty azul" >una</li>
                                                <li class = "empty azul" >farmacia</li>
                                            </ul>
                                        </td>`;
                }else{
                    week[i].innerHTML += `<td>
                                            <ul id = "dia${dias[day].getNum()}" class = "lista_dia select">
                                                <li class = "numeros azul">${dias[day].getNum()}</li>
                                                <li class = "nombres verde">${farmacias_class[dias[day].getTurno()-1].getName()}</li>
                                                <li class = "datos azul" >${farmacias_class[dias[day].getTurno()-1].getDir()}</li>
                                                <li class = "datos azul" >TEL: ${farmacias_class[dias[day].getTurno()-1].getTel()}</li>
                                            </ul>
                                        </td>`;
                }
                day++;
            }
        }
    }
}
function makeTop(){
    topCalendar = document.getElementById("topCalendar");
    topCalendar.innerHTML = ` `;
    topCalendar.innerHTML +=    `<th></th> 
                        <th></th>
                        <th id = "turnostxt" class=" topCalendar">TURNOS</th>
                        <th id = "mes_cont">
                            <select id = "mes" class = "dropdown select verde"></select>
                        </th>
                        <th id = "año_cont">
                            <select id = "año" class = "dropdown select verde"></select>
                        </th>
                        <th></th>
                        <th></th>`;
    mes = document.getElementById("mes");
    año = document.getElementById("año");
    mes.innerHTML = ` `;
    año.innerHTML = ` `;
    for(let i = 0;i<12;i++){
        if(i === currentMonth){
            mes.innerHTML += `  <option value ="${i}" selected = "selected">${meses[currentMonth]}</option> `;
        }else {
            mes.innerHTML += `  <option value ="${i}" id = "hidden${meses[i]}">${meses[i]}</option> `;
        }
    }                
    for(let i = currentDate.getFullYear();i<(currentDate.getFullYear() + 12);i++){
        if(i === currentYear){
            año.innerHTML +=`<option value = "${i}" selected = "selected">${i}</option> `;
        }else {
            año.innerHTML +=`<option value = "${i}" id = "hidden${i}">${i}</option> `;
        }
    }  
    mesQuery = document.querySelector("#mes")
    mesQuery.addEventListener(`change`, ()=> setMonth(mesQuery.value));
    añoQuery = document.querySelector("#año")
    añoQuery.addEventListener(`change`, ()=> setYear(añoQuery.value));
    

}
function changeTurno(day){
    if(dias[day].getTurno() === (numFarmacias)){
        dias[day].setTurno(0);
    }else {
        dias[day].setTurno((dias[day].getTurno())+1);
    }
    makeTurnero();
    makeFunctional();
}
// Prueba
function pruebas(){
    for(let i = 1;i<numDays();i++){
        dias[i].setTurno(getRandomInt(0,numFarmacias +1))
        makeTurnero();
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


