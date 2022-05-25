import { Router } from 'express';
const {SignIn, GetUser} = require('../controller/userController');

const router = Router();

router.get('/', async(req,res)=>{
    try{
        let {name} = req.query
        res.status(200).json(await GetUser(name))
    }catch(error){
        if (error instanceof Error) {
            console.error(error);
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

// router.post('/', async (req,res) => {
//     enum Employees {
//         supervisor,
//         watcher,
//         neighbour
//         }
//     let{ name, lastName, password, dni, role, environment} = req.body;
//     try{
//         if(role!==undefined){
//             let data = await SignIn(name, lastName, password, dni);
//             res.json(data)
//         } else{
//             function create<Employees>(arr: Employees[]){
                
//             }
//         }
//     }catch(error){
//         if (error instanceof Error) {
//             console.error(error);
//             res.status(409).json(error.message);
//         } else {
//             console.log('Unexpected Error', error);
//         }
//     }
// })


export default router;