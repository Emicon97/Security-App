import { Router } from 'express';
import {
    bossModel,
    supervisorModel,
    watcherModel,
    neighbourModel } from '../models/user'

const { GetUser, GetUserById } = require('../controller/userController');

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
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

// router.post('/', async (req,res) => {
//     let{ name, lastName, password, dni } = req.body;
//     try{
//         let data = await SignUp(name, lastName, password, dni);
//         res.json(data)
//     }catch(error){
//         if (error instanceof Error) {
//             console.error(error);
//             res.status(409).json(error.message);
//         } else {
//             console.log('Unexpected Error', error);
//         }
//     }
// })

router.post('/', async (req, res) => {
    let {rol, name, lastName, password, dni, workingHours, probilePic } = req.body;

    if(!rol){
        let findDNI = await bossModel.findOne({dni: dni});

        if(!findDNI){
            const boss = await bossModel.create({name, lastName, password, dni});
            boss.save();
            res.json(boss)
        } else {
            res.send("El usuario ya existe")
        }
    }
    if(rol === "Supervisor"){
        let findDNI = await supervisorModel.findOne({
            dni: dni
        })
        if(!findDNI){
            const supervisor = await supervisorModel.create({
                name, lastName, password, dni, workingHours, probilePic
            })
            supervisor.save()
            res.json(supervisor)
        }else {
            res.send("EL Supervisor con ese DNI ya existe!")
        }
    } else if(rol === "Watcher") {
        let findDNI = await watcherModel.findOne({
            dni:dni
        })
        if(!findDNI){
            const watcher = await watcherModel.create({
                name, lastName, password, dni, workingHours, probilePic
            })
            watcher.save();
            res.json(watcher);
        }else{
            res.send("El Watcher con ese DNI ya existe!")
        }
    }
})

export default router;