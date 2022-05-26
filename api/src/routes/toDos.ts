import { Router } from 'express';
const { getToDos, getToDosByRole, assignTask, updateToDo, deleteToDo } = require('../controller/toDosController');

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
    let { role } = req.body;
    try{
        if (!role.length) {
            let list = await getToDos(id);
            res.status(200).json(list);
        } else {
            let toDos = await getToDosByRole(id, role);
            res.status(200).json(toDos);
        }
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

router.post('/', async (req, res) => {
    let{ name, description, priority, role, id } = req.body;
    try{
        let task = await assignTask(name, description, priority, role, id);
        res.json(task);
    }catch(error){
        if (error instanceof Error) {
            res.status(409).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

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