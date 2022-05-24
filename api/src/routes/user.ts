import { Router } from 'express';
import User from '../models/user';
const {SignIn} = require('../controller/index')
const router = Router();

router.get('/user', (req,res) => {
    res.json("Holis")
})

router.post('/user', async (req,res) => {
    let{name, lastName, password, dni, role} = req.body
    try{
        let data = await SignIn(name, lastName, password, dni, role)
        res.json(data)
    }catch(error){
        console.log(error)
    }
})

export default router;