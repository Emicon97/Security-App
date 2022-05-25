import { Router } from 'express';
import toDosModel from '../models/toDos';
const { assignTask } = require('../controller/toDosController');

const router = Router();

router.get('/', (req,res) => {
    res.json("Holis")
})

router.post('/', async (req,res) => {
    let{ name, description } = req.body
    try{
        let data = await assignTask(name, description)
        res.json(data)
    }catch(error){
        if (error instanceof Error) {
            console.error(error);
            res.status(409).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

router.put('/:id',async(req,res)=>{
    let { id } = req.params;
    let { name, description, status } = req.body
    try{
        let data = await toDosModel.findByIdAndUpdate(id, {
            name,
            description,
            status})

        res.json(data)
    }catch(err){
        console.log("Put error",err)
    }
})

export default router;