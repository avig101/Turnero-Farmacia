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
    #query
    #week
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
    getQuery(){
        return this.#query;
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
    setQuery(query){
        this.#query = query
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
pruebas();


// Funciones


// Años
function setYear(year){
    currentYear = year;
    makeTurnero();
}
function isLeap(){
    return ((currentYear % 4 === 0 ));
}

// Meses
function setMonth(month){
    currentMonth = month
    makeTurnero();
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
function makeTop(){
    topCalendar = document.getElementById("topCalendar");
    topCalendar.innerHTML = ` `;
    topCalendar.innerHTML +=    `   <th></th> 
                                    <th></th>
                                    <th id = "turnostxt" class=" topCalendar">TURNOS</th>
                                    <th id = "mes_cont">
                                        <select id = "mes" class = "dropdownTop select verde"></select>
                                    </th>
                                    <th id = "año_cont">
                                        <select id = "año" class = "dropdownTop select verde"></select>
                                    </th>
                                    <th></th>
                                    <th></th>`;

    mes = document.getElementById("mes");
    año = document.getElementById("año");
    mes.innerHTML = ` `;
    año.innerHTML = ` `;
    for(let i = 0;i<12;i++){
        if(i === currentMonth){
            mes.innerHTML += `  <option value ="${i}" selected = "selected" class = "opt">${meses[currentMonth]}</option> `;
        }else {
            mes.innerHTML += `  <option value ="${i}" id = "hidden${meses[i]}" class = "opt">${meses[i]}</option> `;
        }
    }                
    for(let i = currentDate.getFullYear();i<(currentDate.getFullYear() + 12);i++){
        if(i === currentYear){
            año.innerHTML +=`<option value = "${i}" selected = "selected" class = "opt">${i}</option> `;
        }else {
            año.innerHTML +=`<option value = "${i}" id = "hidden${i}" class = "opt">${i}</option> `;
        }
    }  
    mesQuery = document.querySelector("#mes")
    mesQuery.addEventListener(`change`, ()=> setMonth(mesQuery.value));
    añoQuery = document.querySelector("#año")
    añoQuery.addEventListener(`change`, ()=> setYear(añoQuery.value));
    

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
                week[i].innerHTML += `  <td id = "head${dias[day].getNum()}" class ="casillas">
                                            <ul class ="lista_dia ">
                                                <li class = "numeros azul">${dias[day].getNum()}</li>
                                                <li class = "nombre verde"><br></li>
                                                <li class = "datos azul"><br></li>
                                                <li class = "datos azul"><br></li>
                                            </ul>
                                            <select id = "dia${dias[day].getNum()}" class = "dropdownDays select hidden"><select>
                                        </td>`;
                day++;
            }
        }
    }
    makeDaysRef();
}
function makeDaysRef(){
    for(let i = 1;i<=numDays();i++){
        dias[i].setRef(document.getElementById("dia"+(i.toString())));
        dias[i].getRef().innerHTML = ` <option value = "0">Seleccione</option>`;
        for(let k=0;k<numFarmacias;k++){
            dias[i].getRef().innerHTML += `  <option value = "${k+1}" class = "opt">${farmacias_class[k].getName()}</option>`;                        
        }
        dias[i].setQuery(document.querySelector("#dia"+(i.toString())))
        dias[i].getQuery().addEventListener("change",()=>changeDay(i));
    }
}
function changeDay(i){
    let farm = dias[i].getQuery().value -1;
    if (farm < 0) return;
    let head = document.getElementById("head" +i.toString());
    head.innerHTML = `  <ul class = "lista_dia" >
                            <li class = "numeros azul">${dias[i].getNum()}</li>
                            <li class = "nombre verde">${farmacias_class[farm].getName()}</li>
                            <li class = "datos azul">${farmacias_class[farm].getDir()}</li> 
                            <li class = "datos azul">TEL: ${farmacias_class[farm].getTel()}</li> 
                        </ul>
                        <select id = "dia${dias[i].getNum()}" class = "dropdownDays select hidden"><select>`;
    makeDaysRef();

}

// Prueba
function pruebas(){
    for(let i = 1;i<=numDays();i++){
        dias[i].getQuery().value = getRandomInt(1,numFarmacias);
        changeDay(i);
        
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
