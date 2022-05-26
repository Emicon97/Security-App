import { Router } from 'express';
const { SignUp, GetUser, GetUserById, deleteUser, updateUser } = require('../controller/userController');

const router = Router();
//* GET trae los usuarios segun la clase desde la Base de Datos
//http://localhost:3001/boss/?name={name}
router.get('/', async(req,res)=>{
    try{
        let {name} = req.query
        res.status(200).json(await GetUser(name))
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})
//* GET trae los usuarios segun el id desde la Base de Datos
//http://localhost:3001/boss/:id
router.get('/:id', async(req,res) => {
    try{
        let {id} = req.params
        let dataUser = await GetUserById(id)
        res.json(dataUser)
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

router.post('/', async (req, res) => {
    let { name, lastName, password, dni, role } = req.body;
    try {
        let data = await SignUp(name, lastName, password, dni, role);
        res.json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

router.put('/:id', async (req, res)=>{
    let { id } = req.params;
    let { name, lastName, password, dni, role, workingHours, probilePic } = req.body
    try{
        let data = await updateUser(id, name, lastName, password, dni, role, workingHours, probilePic);
        res.json(data)
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    let { role } = req.body;
    try{
        let message = await deleteUser(id, role);
        res.json(message);
    }catch(error){        
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

export default router;