const express = require('express');
const db = require("./utils/database");
const initModels = require('../src/models/init.model');
const Users = require('./models/users.model');
const Todos = require('./models/todos.models');

const app = express();

//* el body es un archivo json, hay que usar el middleware de express para que del json obtengamos un objeto manipulable por js
app.use(express.json());

const PORT = 8000;


//testing conexion with db
db.authenticate()
.then(()=> console.log("yes bro"))
.catch((e)=> console.log(e));


initModels();
//usar el metodo sync para sincronizar la data de la db
//devuelve una promesa y la resolvemos con then
db.sync({ force: false } )
    .then(()=> console.log("base de datos sincronizada"))
    .catch((e)=> console.log(e));

app.get('/', (req,res)=> {

    //transform to json:
    res.status(200).json({message: "welcome to server"});
});


//!CONSULTAS AL MODELO USERS
app.get('/api/v1/users', async(req, res)=>{

    try{
        const result = await Users.findAll({
            attributes:{ exclude:["createdAt", "updatedAt"]}
        }); //* findAll es el equivalente a SELECT * FROM Users;
        // console.log(result);
        res.status(200).json(result); //*estamos mandando el objeto de respuesta en formato JSON
        // res.end();
    }
    catch(e){
        res.status(400).json(e.message);
}
})

app.get('/api/v1/users/:id', async(req, res)=>{

    const  {id} = req.params;
    const result = await Users.findByPk(id , {attributes: { exclude:["createdAt", "updatedAt" ]}});
    res.status(200).json(result)
});

//todo aplicando findOne en el modelo Users
app.get('/api/v1/users/:email', async(req, res)=>{
    try{
        //desestructuramos la propiedad email del objeto request(req)
        const {email} = req.params;
        const result = await Users.findOne({ where:{email}, attributes:["id","username","email"]});
        res.status(200).json(result);
    }
    catch(e){
        console.log(e)
    }
});

app.get('/api/v1/users/:username', async(req, res)=>{
    try{
        const {username} = req.params;
        const result = await Users.findOne({ where:{username}, attributes:["id", "username"]});
        res.status(200).json(result);
    }
    catch(e){
        console.log(e);
    }
});


//todo Las peticiones hechas con post deben llevar un body, que tendrá la información necesaria para crear el elemento
app.post('/api/v1/users/', async(req, res)=> {
    try{
        const newUser = req.body;
        const result = await Users.create(newUser);
        res.status(201).json(result);// el codigo de estado 201 representa que un elemento se creo exitosamente
    }
    catch(e){
        console.log(e);
    }
    
});


//todo---> (PUT) solo podemos actualizar el password de un user
app.put('/api/v1/users/:id', async (req, res)=>{

    try{
        const {id} = req.params;
        const field = req.body;// el campo que vamos a actualizar es el body de la request
        
                                        //le pasamos el campo que se va actualizar, despues un
        const result = await Users.update(field, {where:{id}});
        
        res.status(200).json(result);
    }
    catch(e){
        res.status(400).json(e);
    }
});


//todo ---> DESTROY solo nececita el id
app.delete('/api/v1/users/:id', async(req, res)=>{
    try{
        const {id} = req.params;

        const result = await Users.destroy({where:{id}});
        res.status(200).json(result);
    }
    catch(e){res.status(404).json(e.message)}
});


//!CONSULTAS AL MODELOS TODOS

//todo---> (GET) obtener todas las task del modelo "todos"
app.get('/api/v1/todos/', async(req, res)=>{
    try{
        const result = await  Todos.findAll({attributes: {exclude:["createdAt","updatedAt"]}});
        res.status(200).json(result);
    }
    catch(e){
        res.status(400).json(e.message);
    }
});

//todo ---> (GET) obtener una tarea por su id (findByPK) 
app.get('/api/v1/todos/:id', async(req, res)=>{

    try{

        const {id} = req.params;
        const result = await Todos.findByPk(id); 
        res.status(200).json(result);      
    }
    catch(e){
        res.status(400).json(e.message);
    }
});


//todo ---> (POST) crear una nueva tarea
app.post('/api/v1/todos/', async(req, res)=>{

    try{

        const newTodo = req.body;
        
        const result = await Todos.create(newTodo);
        res.status(201).json(result);
    }
    catch(e){
        console.error(e);
    }

});

//todo ---> (PUT) actulizar el status de la tarea
app.put('/api/v1/todos/:id', async(req, res)=>{
    try{

        const {id} = req.params;
        const field = req.body;
        
        const result = await Todos.update(field,{where:{id}});
        res.status(200).json(result);
    }
    catch(e){
        res.status(400).json(e.message);
    }
});



//todo ---> (DELETE) borrar una tarea por su id
app.delete('/api/v1/todos/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const result = await Todos.destroy({where:{id}});

        res.status(200).json(result);

    }
    catch(e){
        res.status(400).json(e.message);
    }
})


app.listen(PORT, ()=>{
    console.log(`server listen in: ${PORT}`)
});
