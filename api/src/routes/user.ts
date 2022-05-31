import { Router } from 'express';
const { signUp, GetUser, GetUserById, deleteUser, updateUser } = require('../controller/userController');

const router = Router();

//* GET trae los usuarios segun la clase desde la Base de Datos
//http://localhost:3001/user/?name={name}
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
//http://localhost:3001/user/:id   //*id por params
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

//*GET trae de un Boss por id los supervisores que tiene a su cargo
//* y si el id es de supervisor trae del mismo los watchers a su cargo
//http://localhost:3001/user/:id?name=name
router.get('/:id', async (req, res)=> {
    try{
        let { name } = req.query;
        
    }catch(error){
        console.log('Unexpected Error', error);
    }
})

//* POST crea un usuario segun el role: boss/supervisor/watcher
//http://localhost:3001/user  //*datos enviados por body
router.post('/', async (req, res) => {
    let { name, lastName, password, dni, role, workingHours, profilePic } = req.body;
    try {
        let data = await signUp(name, lastName, password, dni, role, workingHours, profilePic);
        res.json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*PUT modifica los datos de un usuario segun su role: supervisor/watcher
//http://locahost:3001/user/:id   //*id por params, datos por body
router.put('/:id', async (req, res)=>{
    let { id } = req.params;
    let { name, lastName, password, dni, role, workingHours, probilePic } = req.body
    try{
        let data = await updateUser(id,role, name, lastName, password, dni, workingHours, probilePic);
        res.json(data)
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*DELETE elimina un usuario segun su rol: supervisor/watcher
//http://localhost:3001/user/:id  //*id por params
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