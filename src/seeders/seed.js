const Categories = require("../models/categories.model");
const Todos = require("../models/todos.models");
const Users = require("../models/users.model");
const todosCategories = require("../models/todosCategories.model")


const initModels = require("../models/init.model");
const db = require("../utils/database");


initModels();


const users = [
    {username: "Daniel Martinez", email: "daniel.martinez@gmail.com", password: "1234"},
    {username: "Alma Camacho", email: "almacamacho@gmail.com", password: "12345"},
    {username: "Monserrat Antunez", email:"monseAnt@gmail.com", password: "4321"},
];

const tasks =[
    {
        title: "crear seeders",
        description: "terminar el archivo para los seeders",
        userId: 1,
    },

    {
        title: "hacer ejercicio",
        description: "hacer ejercicio al menos 3 veces x semana",
        userId: 2,
    }, 

    {
        title: "leer un libro",
        userId: 3,
    },
];

const categories =[
    {name: "personal"},//1
    {name: "escuela"},//2
    {name: "salud"},//3
    {name: "trabajo"},//4
    {name: "hogar"},//5
    {name: "deporte"},//6
    {name: "ocio"},//7
    {name: "financiero"},//8
]

//tabla pivote---> todo_id, category_id
const tc =[
{todoId: 1, categoryId: 1},
{todoId: 1, categoryId: 2},
{todoId: 1, categoryId: 4},
{todoId: 2, categoryId: 3},
{todoId: 2, categoryId: 6},
{todoId: 3, categoryId: 1},
{todoId: 3, categoryId: 7},

]

db.sync({force:true})
.then(()=>{
    console.log("iniciando la plantacion de informacion");
    users.forEach(user => Users.create(user));//INSERT INTO users () VALUES()

    //*primero crea a los usuarios, 100 milisegundos despues va crear las todos, ya que no se pude crear un todo sin un userid
    
    setTimeout(()=>{
        tasks.forEach(task => Todos.create(task));
    },100);

    setTimeout(() => {
        categories.forEach(category => Categories.create(category));
    }, 200);

    setTimeout(() => {
        tc.forEach(tc => todosCategories.create(tc));
    }, 300);
}
)
.catch(e=> console.log(e))