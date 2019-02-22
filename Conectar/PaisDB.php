<?php

require_once 'conexion.inc.php';

class PaisDB {

    static public function leerPaisesSemi($pais) {
        $paises = [];
        $sql = "SELECT name FROM country WHERE name LIKE '$pais%'"; //Consulta que devuelve los paises que empiecen por lo que haya escrito en el campo texto
        $conexion = conectar(); //Conectamos con la BD
        $consulta = $conexion->query($sql); //Ejecutamos la consulta
        $tupla = $consulta->fetch_array();
        while ($tupla != NULL) { //Mientras queden tuplas crearemos el array asociativo tupla2, con los siguientes valores
            $tupla2 = array(
                "Nombre" => $tupla[0],
            );
            array_push($paises, $tupla2); //E introducire cada uno en otro array, paises, el cual luego devolvere con json
            $tupla = $consulta->fetch_array();
        }
        return json_encode($paises);
    }

    static public function leerPais($pais) {
        $paises = [];
        $sql = "SELECT * FROM country WHERE name='$pais'"; //Obtiene todos los datos de un pais
        $conexion = conectar();
        $consulta = $conexion->query($sql);
        $tupla = $consulta->fetch_array();
        while ($tupla != NULL) { //Crea un array asociativo con todos los datos del pais
            $tupla2 = array(
                "Code" => $tupla[0],
                "Name" => $tupla[1],
                "Continente" => $tupla[2],
                "Region" => $tupla[3],
                "SurfaceArea" => $tupla[4],
                "IndepYear" => $tupla[5],
                "Population" => $tupla[6],
                "LifeExpectancy" => $tupla[7],
                "GNP" => $tupla[8],
                "GNPOld" => $tupla[9],
                "LocalName" => $tupla[10],
                "GovernmentForm" => $tupla[11],
                "HeadState" => $tupla[12],
                "Capital" => $tupla[13],
                "Code2" => $tupla[14]
            );
            array_push($paises, $tupla2); //E introducire cada uno en otro array, paises, el cual luego devolvere con json
            $tupla = $consulta->fetch_array();
        }
        return json_encode($paises);
    }

    function leerCiudades($pais) {
        $datos = [];
        $sql = "SELECT Name FROM city WHERE CountryCode=(SELECT Code FROM country WHERE Name='$pais')"; //Devuelve los nombre del pais que tiene el mismo que el pais que le hemos pasado
        $conexion = conectar();
        $consulta = $conexion->query($sql);
        $tupla = $consulta->fetch_array();
        while ($tupla != NULL) {
            $tupla2 = array( //Creamos un array asociativo con los nombres de las ciudades de ese pais
                "Nombre" => $tupla[0]
            );
            array_push($datos, $tupla2); //E introducimos cada uno en otro array, paises, el cual luego devolvere con json
            $tupla = $consulta->fetch_array();
        }
        return json_encode($datos);
    }

    function leerCiudadesDatos($ciudad) {
        $datos = [];
        $sql = "SELECT * FROM city WHERE Name='$ciudad'"; //Devuelve todos los datos de la ciudad indicada
        $conexion = conectar();
        $consulta = $conexion->query($sql);
        $tupla = $consulta->fetch_array();
        while ($tupla != NULL) {
            $tupla2 = array( //Creo un array asociativo con todos los datos de la ciudad
                "ID" => $tupla[0],
                "Name" => $tupla[1],
                "CountryCode" => $tupla[2],
                "District" => $tupla[3],
                "Population" => $tupla[4]
            );
            array_push($datos, $tupla2); //E introduzco el array asociativo dentro del array datos y luego devuelvo datos
            $tupla = $consulta->fetch_array();
        }
        return json_encode($datos);
    }

    function obtenerIdioma($pais) {
        $datos = [];
        $sql = "SELECT Language FROM country co, countrylanguage coL WHERE coL.countrycode=co.code AND co.Name='$pais'"; //Obtiene el todos los idiomas de un mismo pais
        $conexion = conectar();
        $consulta = $conexion->query($sql);
        $tupla = $consulta->fetch_array();
        while ($tupla != NULL) { //Creo un array asociativo con todos los idiomas
            $tupla2 = array(
                "Language" => $tupla[0]
            );
            array_push($datos, $tupla2); //Lo introduzco en el array datos y luego lo devuelvo con json
            $tupla = $consulta->fetch_array();
        }
        return json_encode($datos);
    }

    function obtenerCapital($pais) {
        $datos = [];
        $sql = "SELECT Name FROM city WHERE ID=(SELECT Capital FROM country WHERE Name='$pais')"; //Obtiene la capital del pais
        $conexion = conectar();
        $consulta = $conexion->query($sql);
        $tupla = $consulta->fetch_array();
        while ($tupla != NULL) { //Creo un array asociativo con el nombre de la capital
            $tupla2 = array(
                "Name" => $tupla[0]
            );
            array_push($datos, $tupla2); //Lo introduzco en el array datos y luego lo devuelvo con json
            $tupla = $consulta->fetch_array();
        }
        return json_encode($datos);
    }

}
