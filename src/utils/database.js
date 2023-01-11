const {Sequelize} = require('sequelize');

//crear una instancia con parametros de configuracion de nuestra base de datos 
//un objeto de configuracion---> credenciales de la base de datos
const db = new Sequelize({
    database: "todoapp",
    username: "postgres",
    host: "localhost", //127.0.0.1
    port: "5432",
    password: "root",
    dialect: "postgres"//define la bd que estamos usando
}) ;

module.exports = db;