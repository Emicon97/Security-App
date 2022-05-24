import { Router } from 'express';
<<<<<<< HEAD
const {SignIn} = require('../controller/toDosController')
=======
const {SignIn} = require('../controller/userController')
>>>>>>> 9558f6bd4b7acaf3b557941c98d58a4f9a55c649
const router = Router();

router.get('/', (req,res) => {
    res.json("Holis")
})

router.post('/', async (req,res) => {
    let{name, lastName, password, dni, role} = req.body
    try{
        let data = await SignIn(name, lastName, password, dni, role)
        res.json(data)
    }catch(error){
        console.log(error)
    }
})

export default router;