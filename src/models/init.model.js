//importar todos nuestros modelos creados
const Users = require('./users.model');
const Todos = require('./todos.models');
const Categories = require("./categories.model");
const TodosCategories  = require("./todosCategories.model");


const initModels=()=>{
    Todos.belongsTo(Users, {as: "author", foreignKey: "user_id"}); //un todo pertenece a un user
    Users.hasMany(Todos, {as: "task", foreignKey: "user_id"}); //un user tiene muchos todos
    

    //quien tiene las llaves foreaneas ?? -->TodosCategories

    
    TodosCategories.belongsTo(Todos, {as:"task", foreignKey: "todo_id"});
    Todos.hasMany(TodosCategories, {as: "category", foreignKey: "todo_id"});


    TodosCategories.belongsTo(Categories, {as:"category", foreignKey:"category_id"});
    Categories.hasMany(TodosCategories,{as:"task", foreignKey:"category_id"});
}

module.exports = initModels;
