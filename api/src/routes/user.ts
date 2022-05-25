import { Router } from 'express';
const {SignIn} = require('../controller/userController');

const router = Router();

router.get('/', (req,res) => {
    res.json("Holis")
})

router.post('/', async (req,res) => {
    let{ name, lastName, password, dni, role, environment, toDos } = req.body;
    try{
        let data = await SignIn(name, lastName, password, dni, role, environment, toDos);
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