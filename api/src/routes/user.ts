import { Router } from 'express';
const {SignIn} = require('../controller/userController');
const router = Router();

router.get('/', (req,res) => {
    res.json("Holis")
})

<<<<<<< HEAD
router.post('/user', async (req,res) => {
    let{name, lastName, password, dni, role} = req.body;
    try{
        let data = await SignIn(name, lastName, password, dni, role);
=======
router.post('/', async (req,res) => {
    let{name, lastName, password, dni, role, environment} = req.body
    try{
        let data = await SignIn(name, lastName, password, dni, role, environment)
>>>>>>> 9558f6bd4b7acaf3b557941c98d58a4f9a55c649
        res.json(data)
    }catch(error){
        console.log(error);
        res.status(409).json(error);
    }
})

export default router;