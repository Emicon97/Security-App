import { Router } from 'express';
const { logIn } = require('../controller/logInController');
const { getUserById } = require('../controller/userController');
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async(req, res, next)=>{
   try{
       let {dni, password}= req.body;
       console.log(req.body)
       let findUser = await logIn(dni, password);
       console.log(findUser, "findUser")
      
       if(findUser!==false){
               const token = jwt.sign({_id:findUser.id}, process.env.TOKEN_SECRET || 'tokenPass', {
               expiresIn:60*60*24
           })
           let dataUser = await getUserById(findUser.id);
           console.log(dataUser, "dataUSer")
           dataUser.push(token);
           res.json(dataUser);
       } else {
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

export default router;