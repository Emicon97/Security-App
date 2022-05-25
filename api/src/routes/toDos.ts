import { Router } from 'express';
import toDosModel from '../models/toDos';
const { getToDos, assignTask, assignToWorker } = require('../controller/toDosController');

const router = Router();

//* GET trae todos las tareas de la Base de Datos
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

//* GET trae una tarea en espeficico por ID
//http://localhost:3001/todos/:id
router.get('/:id', async (req, res) => { 
    let { id } = req.params;
    try{
        let list = await getToDos(id);
        res.status(200).json(list);
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//* POST crea una tarea 
//http://localhost:3001/todos/
router.post('/', async (req, res) => {
    let{ name, description, id } = req.body;
    try{
        let task = await assignTask(name, description);
        let assign = await assignToWorker(id, task);
        res.json(task);
    }catch(error){
        if (error instanceof Error) {
            res.status(409).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//* PUT modifica una tarea por ID
//http://localhost:3001/todos/:id
router.put('/:id', async (req, res)=>{
    let { id } = req.params;
    let { name, description, status } = req.body
    try{
        let data = await toDosModel.findByIdAndUpdate(id, {
            name,
            description,
            status})

        res.json(data)
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//* DELETE elimina una tarea por ID
//http://localhost:3001/todos/:id
router.delete('/:id', async (req, res)=>{
    let { id } = req.params;
    try{

        const todo = await toDosModel.findByIdAndDelete(id)
        res.json(todo)
    }catch(error){
        console.log(error)
    }

})

export default router;