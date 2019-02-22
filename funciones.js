
$(asociarEventos);

function asociarEventos() { //Funcionalidad a los select y campo de texto
    $("input#pais").keyup(function () {
        buscarPais();
    });

    $("select#paises").click(function () {
        datosPais();
        rellenarCapital();
        rellenarCiudades();
        rellenarIdioma();
    });

    $("select#ciudades").click(function () {
        datosCiudad();
    });
}

function datosCiudad() {
    var ciudad = $("select#ciudades").val();

    $.post("Conectar/controlador.php",
            {
                accion: "datosciudad",
                ciudad: ciudad
            }, function (resultado) {
        rellenarDatosCiudad(resultado[0]);
    }, "json");
}

function rellenarDatosCiudad(datos) { //Relleno los campos con sus respectivos valores, datos tiene todos los valores, solo hay que especificar que valor queremos
    $("input#ciudad").val(datos["Name"]);
    $("input#distrito").val(datos["District"]);
    $("input#poblacionC").val(datos["Population"]);
}

function rellenarCiudades() {
    var pais = $("select#paises").val();
    $("select#ciudades").empty(); //Esta funcion borra el select
    
    $.post("Conectar/controlador.php",
            {
                accion: "buscarciudades",
                pais: pais
            }, function (resultado) {
        for (var i = 0; i < resultado.length; i++) {
            crearLista(resultado[i]["Nombre"], "ciudades");
        }
    }, "json");
}

function buscarPais() {
    var pais = $("input#pais").val();
    $("select#paises").empty();

    $.post("Conectar/controlador.php",
            {
                accion: "buscarpais",
                pais: pais
            }, function (resultado) {
        for (var i = 0; i < resultado.length; i++) {
            crearLista(resultado[i]["Nombre"], "paises");
        }
    }, "json");
}

function crearLista(pais, lista) { //A esta funcion le paso como parámetro el nombre del pais/ciudad, y el select en el que voy a introducir los valores
    var option = document.createElement("option");
    var select = document.getElementById(lista);
    var optionPais = document.createTextNode(pais);

    option.setAttribute("value", pais);
    option.appendChild(optionPais);
    select.appendChild(option);
}

function datosPais() {
    var pais = $("select#paises").val();

    $.post("Conectar/controlador.php",
            {
                accion: "datospais",
                pais: pais
            }, function (resultado) {
        rellenarDatos(resultado[0]);
    }, "json");
}

function rellenarDatos(datos) { //Rellena los campos de los datos del pais
    $("input#Npais").val(datos["Name"]);
    $("input#continente").val(datos["Continente"]);
    $("input#superficie").val(datos["SurfaceArea"]);
    $("input#poblacion").val(datos["Population"]);
}

function rellenarIdioma() {
    var pais = $("select#paises").val();
    $("select#idioma").empty();
    
    $.post("Conectar/controlador.php",
            {
                accion: "obteneridioma",
                pais: pais
            }, function (resultado) { //Escribe en el campo de idiomas todos los idiomas que tiene el pais
        for (var i = 0; i < (resultado.length); i++) {
            crearLista(resultado[i]["Language"], "idioma");
        }
    }, "json");
}

function rellenarCapital() {
    var pais = $("select#paises").val();

    $.post("Conectar/controlador.php",
            {
                accion: "obtenercapital",
                pais: pais
            }, function (resultado) { //Relleno el campo de capital con el valor que he obtenido
        $("input#capital").val(resultado[0]["Name"]);
    }, "json");
}