import { Router } from 'express';
const { SignUp } = require('../controller/userController');

const router = Router();

router.get('/', (req,res) => {
    res.json("Holis")
})

router.post('/', async (req,res) => {
    let{ name, lastName, password, dni } = req.body;
    try{
        let data = await SignUp(name, lastName, password, dni);
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


export default router;