import { Router } from 'express';
const {SignIn} = require('../controller/toDosController')
const router = Router();

router.get('/todos', (req,res) => {
    res.json("Holis")
})

router.post('/todos', async (req,res) => {
    let{name, lastName, password, dni, role} = req.body
    try{
        let data = await SignIn(name, lastName, password, dni, role)
        res.json(data)
    }catch(error){
        console.log(error)
    }
})

export default router;