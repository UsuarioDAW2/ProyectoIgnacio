window.onload = function () {
    init();
};

function init() {
    document.getElementById("pais").addEventListener("keyup", function () { //Funcionalidad de los botones y select
        buscarPais(this);
    });

    document.getElementById("paises").addEventListener("click", function () {
        datosPais(this);
        rellenarCapital(this);
        rellenarCiudades(this);
        rellenarIdioma(this);
    });

    document.getElementById("ciudades").addEventListener("click", function () {
        datosCiudad(this);
    });
}

function datosCiudad(ciudad) {
    var resultado = post("Conectar/controlador.php", "accion=datosciudad&ciudad=" + ciudad.value); //En resultado se guardan los valores obtenidos por la consulta

    rellenarDatosCiudad(resultado[0]);
}

function rellenarDatosCiudad(datos) { //Relleno los campos con sus respectivos valores, datos tiene todos los valores, solo hay que especificar que valor queremos
    var ciudad = get("ciudad");
    var distrito = get("distrito");
    var poblacionC = get("poblacionC");

    ciudad.value = datos["Name"];
    distrito.value = datos["District"];
    poblacionC.value = datos["Population"];
}

function rellenarIdioma(pais) {
    limpiarSelect(get("idioma"));
    var resultado = post("Conectar/controlador.php", "accion=obteneridioma&pais=" + pais.value); //En resultado se guardan los valores obtenidos por la consulta

    for (var i = 0; i < (resultado.length); i++) {
        crearLista(resultado[i]["Language"], "idioma");
    }
}

function rellenarCiudades(pais) {
    limpiarSelect(get("ciudades"));
    var resultado = post("Conectar/controlador.php", "accion=buscarciudades&pais=" + pais.value); //En resultado se guardan los valores obtenidos por la consulta

    for (var i = 0; i < resultado.length; i++) {
        crearLista(resultado[i]["Nombre"], "ciudades");
    }
}

function rellenarCapital(pais) {
    var resultado = post("Conectar/controlador.php", "accion=obtenercapital&pais=" + pais.value);

    var capital = get("capital");
    capital.value = resultado[0]["Name"];
}

function datosPais(pais) {
    var resultado = post("Conectar/controlador.php", "accion=datospais&pais=" + pais.value);

    rellenarDatos(resultado[0]);
}

function rellenarDatos(datos) { //Rellena los campos de los datos del pais
    var nPais = get("Npais");
    var continente = get("continente");
    var superficie = get("superficie");
    var poblacion = get("poblacion");

    nPais.value = datos["Name"];
    continente.value = datos["Continente"];
    superficie.value = datos["SurfaceArea"];
    poblacion.value = datos["Population"];
}

function buscarPais(pais) {
    limpiarSelect(get("paises"));
    var resultado = post("Conectar/controlador.php", "accion=buscarpais&pais=" + pais.value);

    for (var i = 0; i < resultado.length; i++) {
        crearLista(resultado[i]["Nombre"], "paises");
    }
}

function post(url, parametros) {
    if (window.XMLHttpRequest) {
        // Codigo para navegadores nuevos
        http = new XMLHttpRequest();
    } else {
        // Codigo para navegadores antiguos como IE
        http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = url;
    var params = parametros;
    var objetos;
    http.open('POST', url, false);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            objetos = JSON.parse(http.responseText);
        }
    }
    http.send(params);

    return objetos;
}

function crearLista(pais, lista) { //A esta funcion le paso como parámetro el nombre del pais/ciudad, y el select en el que voy a introducir los valores
    var option = document.createElement("option");
    var select = document.getElementById(lista);
    var optionPais = document.createTextNode(pais);

    option.setAttribute("value", pais);
    option.appendChild(optionPais);
    select.appendChild(option);
}

function limpiarSelect(select) { //Como parámetro le paso el select que quiero limpiar
    while (select.firstChild) {
        select.removeChild(select.firstChild); //Mientras queden hijos, es decir enlaces, seguirá dentro del bucle para borrarlos todos
    }
}

function get(nombre) { //Funcion para mas comodidad a la hora de crear variables de campos
    return document.getElementById(nombre);
}