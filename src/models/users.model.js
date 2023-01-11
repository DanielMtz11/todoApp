//instancia para la conexion a la db
const db = require("../utils/database");

//tipos de datos de sequelize 
const {DataTypes} =require("sequelize");

//definir el modelo de usuarios
//los modelos se definen con mayuscula al inicio


//parametros:
    //nombre de la tabla
    //atributos de las tablas 
const Users = db.define("users", {
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,  
    },

    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },

    email: {   
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail: true,
        }
    },
});

module.exports = Users;