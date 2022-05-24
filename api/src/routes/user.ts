import { Router } from 'express';
const {SignIn} = require('../controller/userController');
const router = Router();

router.get('/', (req,res) => {
    res.json("Holis")
})

router.post('/user', async (req,res) => {
    let{name, lastName, password, dni, role} = req.body;
    try{
        let data = await SignIn(name, lastName, password, dni, role);

        res.json(data)
    }catch(error){
        console.log(error);
        res.status(409).json(error);
    }
})

export default router;