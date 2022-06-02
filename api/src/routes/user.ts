import { Router } from 'express';
import { getCookie, setCookie } from 'typescript-cookie';
const { signUp, getUserById, getUserByHierarchy, deleteUser, updateUser } = require('../controller/userController');
const {logIn} = require('../controller/logInController');

const router=Router();

router.post('/login', async(req, res, next)=>{
    try{
       let {dni, password }= req.body;
       let findUser = await logIn(dni, password);
       let url = findUser.id;
       console.log('hola' + url)
       if(findUser!==false){
          setCookie('id', url);
          res.redirect(`../`);
       }else{
          res.redirect('/');
       }
    } catch (error) {
       if (error instanceof Error) {
          res.status(404).json(error.message);
       } else {
          console.log('Unexpected Error', error);
       }
    }
 })

const isNotAuth = async (req, res, next) => {
    try {
        let id = getCookie('id');
        let findUser = await getUserById(id);
        if(findUser === null) {
        }
        next();
     } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
            res.redirect('../login');
        } else {
            console.log('Unexpected Error', error);
        }
     }
}

//* GET trae los usuarios segun el id desde la Base de Datos
//http://localhost:3001/user/:id   //*id por params
router.get('/:id', async(req,res) => {
    try{
        let { id } = req.params;
        console.log('get uer by id' + id);
        let dataUser = await getUserById(id);
        res.json(dataUser);
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
router.get('/employees/:id', async (req, res)=> {
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


//* POST crea un usuario segun el role: boss/supervisor/watcher
//http://localhost:3001/user  //*datos enviados por body
router.post('/:id', async (req, res) => {
    let { id } = req.params;
    let { name, lastName, password, dni, email, telephone, environment, workingHours, profilePic } = req.body;
    try {
        let data = await signUp(id, name, lastName, password, dni, email, telephone, environment, workingHours, profilePic);
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
    let { password, email, telephone, environment, workingHours, profilePic } = req.body;
    try{
        let data = await updateUser(id, password, email, telephone, environment, workingHours, profilePic);
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