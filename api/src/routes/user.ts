import { Router } from 'express';
const { getEmployeesAriel, signUp, getUserById, getUserByHierarchy, deleteUser, updateUser } = require('../controller/userController');

const router = Router();

// //* GET trae los usuarios segun la clase desde la Base de Datos
// //http://localhost:3001/user/?name={name}
// router.get('/', async(req,res)=>{
//     try{
//         let { role } = req.query;
//         let users = await getUsers(role);
//         res.status(200).json(users);
//     }catch(error){
//         if (error instanceof Error) {
//             res.status(404).json(error.message);
//         } else {
//             console.log('Unexpected Error', error);
//         }
//     }
// })

//* GET trae los usuarios segun el id desde la Base de Datos
//http://localhost:3001/user/:id   //*id por params
router.get('/:id', async(req,res) => {
    try{
        let { id } = req.params;
        let userData = await getUserById(id);
        res.json(userData);
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
router.get('/:id/employees', async (req, res)=> {
    try{
        let { id } = req.params;
        let { name } = req.query;
        let userData = await getUserByHierarchy(id, name);
        res.json(userData);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})


//*GET trae de un Boos/Supervisor sus subordinados
//http://localhost:3001/user/employees/:id
router.get('/employees/:id', async (req, res) =>{
    let { id } = req.params;
    let { name } = req.query;
    try{
       let employees= await getUserByHierarchy(id, name)
       res.json(employees)
      
    }catch(error){
        console.log('Unexpected Error', error)
    }
})

//* POST crea un usuario segun el role: boss/supervisor/watcher
//http://localhost:3001/user  //*datos enviados por body
router.post('/:id', async (req, res) => {
    let { id } = req.params;
    let { name, lastName, password, dni, email, telephone, workingHours, profilePic } = req.body;
    try {
        let data = await signUp(id, name, lastName, password, dni, email, telephone, workingHours, profilePic);
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