const db = require('../utils/database');
const {DataTypes} = require('sequelize');
const Users = require('./users.model');
//el modelo se declara con mayuscula
const Todos = db.define("todos", {

    id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: DataTypes.INTEGER,
    },

    title:{
        allowNull: false,
        unique: false,
        type: DataTypes.STRING,
    },

    description:{
        allowNull: true,
        type: DataTypes.STRING,
    },

    isComplete:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_complete"
    },

    userId:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field: "user_id",
        // references:{
        //     model: Users,
        //     key: "id"
        // }
    },

    });

    module.exports = Todos