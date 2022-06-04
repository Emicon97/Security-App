import { Router } from 'express';
const {logIn} = require('../controller/logInController');
import { sessionModel } from '../models/session';

const router = Router();

//Login (prueba)
// router.post('/', async(req, res)=>{
//    try{
//       let {dni, password}= req.body;
//       let findUser = await logIn(dni, password);
//       let url = findUser.id;
      
//       if(findUser!==false){
//          res.cookie('id', url);
//          res.redirect(`../user/${url}`);
//       }else{
//          res.redirect('/');
//       }
//    } catch (error) {
//       if (error instanceof Error) {
//          res.status(404).json(error.message);
//       } else {
//          console.log('Unexpected Error', error);
//       }
//    }
// })

export default router;