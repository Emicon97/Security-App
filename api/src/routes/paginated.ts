import { Router } from 'express';
import toDosModel from '../models/toDos';

const { getEmployeesPaginatedManager }= require('../controller/paginatedController');
const { workerIdentifier } = require('../controller/toDosController')
const router = Router();

//*Paginado :id User Boss/Supervisor
//http://localhost:3001/paginated/:id?limit=limit&skip=skip&name=name
router.get('/:id', async (req, res) => {
    let { id }:any = req.params;
    let { limit, skip }: any = req.query;
    let { name }:any = req.query;
    try{
        let response = await getEmployeesPaginatedManager(id, limit, skip, name)
        res.json(response)
    }catch(error){
        console.log(error)
    }
})

//*Paginado de :tareas User Supervisor/watcher
//http://localhost:3001/paginated/:id?limit=limit&skip=skip&name=name
router.get('/todos/:id', async(req, res) => {
    let { id }: any = req.params;
    let { limit, skip }:any = req.query;
    let { name }:any = req.query;
    try{
        let response = getTodoPaginatedManager(id, limit, skip, name);
        res.json(response)
    }catch(error){
        console.log(error)
    }
})


async function getTodoPaginatedManager(id:string, limit:number, skip:number, name:string){
    try{
        if(id && limit && skip && !name){
            return await getToDosPaginatedAll(id, limit, skip)
        }else if (id && limit && skip && !name){
            return await getToDosPaginatedFilterName(id, limit, skip, name)
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}

async function getToDosPaginatedAll (id:string, limit:number, skip:number) {
    try{
        let role = await workerIdentifier(id);
        return await toDosModel.find({[role]: id}).skip(skip).limit(limit)
    }catch(error:any){
        throw new Error(error.message)
    }
}


async function getToDosPaginatedFilterName (id:string, limit:number, skip:number, name:string){
    try{
        let role = await workerIdentifier(id);
        //en proceso 
        return await toDosModel.find({[role]:id}).skip(skip).limit(limit)
    }catch(error:any){
        throw new Error(error.message)
    }
}


export default router;