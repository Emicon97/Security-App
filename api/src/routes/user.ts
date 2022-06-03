import { Router } from 'express';
const { signUp, getUserById, getUserByHierarchy, deleteUser, updateUser } = require('../controller/userController');
<<<<<<< HEAD
const {logIn}=require('../controller/logInController')
import jwt from 'jsonwebtoken';
// import { TokenValidation } from './../libs/verifyToken';

const router=Router()

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Access denied')
    const payload = jwt.verify(token,process.env.TOKEN_SECRET||'tokenPass') as IPayload
    req.userId = payload._id;
    next()
}
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
// const isNotAuth= async(req,res,next)=>{
//     let {id} = req.cookies
//     console.log("acaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",id)
//     let findUser = await getUserById(id)
//     if(findUser===null){
//         res.redirect('../login')
//     }
//     next()
// }

//* GET trae los usuarios segun el id desde la Base de Datos
//http://localhost:3001/user/:id   //*id por params
router.get('/:id',TokenValidation ,async(req,res) => {
=======
const { idIdentifier } = require('../controller/logInController');

const router=Router();

//* GET trae los usuarios segun el id desde la Base de Datos
//http://localhost:3001/user/:id   //*id por params
router.get('/:id', async(req,res) => {
>>>>>>> 7106e847e77e625ed1272f31e7b0af112448dafb
    try{
        console.log('req',TokenValidation)
        let { id } = req.params;
        console.log('elIDdeget:id',id)
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

router.post('/login', async(req, res)=>{
    try{
       let {dni, password}= req.body;
       let findUser = await logIn(dni, password);
       
       console.log('first',findUser)
       if(findUser!==false){
          const token = jwt.sign({_id:findUser.id}, process.env.TOKEN_SECRET||'tokenPass',{
              expiresIn:60*60*24
          })
          res.header('auth-token',token).json(findUser);
       }else{
          res.redirect('/login');
       }
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
        await idIdentifier(id);
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
        const token = jwt.sign({_id:data.id}, process.env.TOKEN_SECRET||'tokenPass',{
            expiresIn:60*60*24
        })
        res.header('auth-token',token).json(data);
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