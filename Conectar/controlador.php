<?php

require_once 'PaisDB.php';

if (isset($_REQUEST["accion"])) {
    $accion = $_REQUEST["accion"];
    $accion = strtolower($accion);
    $accion = str_replace(" ", "", $accion);

    switch ($accion) {
        case "buscarpais":
            $pais = $_REQUEST["pais"];
            $paises = PaisDB::leerPaisesSemi($pais);
            echo $paises;
            break;

        case "datospais":
            $pais = $_REQUEST["pais"];
            $datos = PaisDB::leerPais($pais);
            echo $datos;
            break;

        case "buscarciudades":
            $pais = $_REQUEST["pais"];
            $datos = PaisDB::leerCiudades($pais);
            echo $datos;
            break;

        case "datosciudad":
            $ciudad = $_REQUEST["ciudad"];
            $datos = PaisDB::leerCiudadesDatos($ciudad);
            echo $datos;
            break;

        case "obteneridioma":
            $pais = $_REQUEST["pais"];
            $idioma = PaisDB::obtenerIdioma($pais);
            echo $idioma;
            break;

        case "obtenercapital":
            $pais = $_REQUEST["pais"];
            $capital = PaisDB::obtenerCapital($pais);
            echo $capital;
            break;
    }
}