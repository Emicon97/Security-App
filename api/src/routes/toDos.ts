import { Router } from 'express';
const { getToDos, getToDosByRole, getByIdAndStatus, getByIdAndName, assignTask, updateToDo, deleteToDo } = require('../controller/toDosController');

const router = Router();


//*GET trae todas las tareas en la Base de Datos
//http://localhost:3001/todos 
router.get('/', async (req, res) => {
    try{
        let list = await getToDos();
        res.status(200).json(list);
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*GET trae todas las tareas de un usuario por role: supervisor/watcher
//http://localhost:3001/todos/:id  //*id por params del "usuario"
router.get('/:id', async (req, res) => { 
    let { id } = req.params;
    try{
        let list = await getToDos(id);
        if (list) {
            res.status(200).json(list);
        }

        let toDos = await getToDosByRole(id);
        res.status(200).json(toDos);
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})


//*GET trae todas las tareas de un usuario segun el name de la tarea
//http://localhost:3001/todos/:id/search?name=name
router.get('/:id/search', async (req, res) => {
    let { id } = req.params;
    let { name } = req.query;
    try{
        let toDos = await getByIdAndName(id, name);
        res.status(200).json(toDos);
    }catch(error){
        console.log('Unexpected Error', error)
    }
})


//*GET trae las tareas de un usuario con un status especifico 
//http://localhost:3001/todos/:id/:status //*id y status por params
router.get('/:id/:status', async (req, res) => { 
    let { id, status } = req.params;
    try{
        let toDos = await getByIdAndStatus(id, status);
        res.status(200).json(toDos);
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*POST crea una tarea nueva y es asignada al mismo tiempo a un usuario
//* por role: supervisor/watcher y por id del usuario
//http://localhost:3001/todos //*datos por body
router.post('/', async (req, res) => {
    let{ name, description, priority, id } = req.body;
    try{
        let task = await assignTask(name, description, priority, id);
        res.json(task);
    }catch(error){
        if (error instanceof Error) {
            res.status(409).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*PUT modifica los datos de una tarea
//http://locahost:3001/todos/:id  //*id por params, datos a cambiar por body
router.put('/:id', async (req, res)=>{
    let { id } = req.params;
    let { name, description, status } = req.body
    try{
        let data = await updateToDo(id, name, description, status);
        res.json(data)
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})


//*DELETE elimina una tarea por id
//http://localhost:3001/todos/:id //*id por params
router.delete('/:id', async (req, res)=>{
    let { id } = req.params;
    try{
        const successMessage = await deleteToDo(id);
        res.json(successMessage);
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

export default router;