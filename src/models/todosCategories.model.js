const db = require ("../utils/database");
const {DataTypes} = require('sequelize');
const Categories = require("./categories.model");
const Todos = require("./todos.models");

const TodosCategories = db.define("todos_categories",{

    id:{
        primaryKey:true,
        autoIncrement: true,
        allowNull:false,
        unique: true,
        type: DataTypes.INTEGER,

    },
    
    categoryId:{
        allowNull:false,
        field: "category_id",
        type: DataTypes.INTEGER,
        references:{
            model: Categories,
            key: "id",
        }
    },

    todoId:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field: "todo_id",
        references:{
            model: Todos,
            key: "id"
        }
    },
    },
    {timestamps:false}
);

module.exports = TodosCategories;