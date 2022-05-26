import { Router } from 'express';
import toDosModel from '../models/toDos';
const { getToDos, assignTask, assignToWorker, updateToDo, deleteToDo } = require('../controller/toDosController');

const router = Router();

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
    let{ name, description, role, id } = req.body;
    try{
        let task = await assignTask(name, description, role, id);
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

//* DELETE elimina una tarea por ID
//http://localhost:3001/todos/:id
router.delete('/:id', async (req, res)=>{
    let { id } = req.params;
    try{
        const successMessage = deleteToDo(id);
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