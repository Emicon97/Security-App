import {bossModel, neighbourModel, supervisorModel, watcherModel} from '../models/user';

async function SignIn(name:string,lastName:string,password:string,dni:number) {
    let findInDb = await bossModel.findOne({
        dni: dni,
    })
    
    try {
        if(findInDb===null){
            let createUser = await bossModel.create({
                name,
                lastName,
                password,
                dni
            }) 
            createUser.save()
            return 'Usuario creado correctamente...'
        }
    } catch (err:any) {
        throw new Error (err)
        //throw new Error ('El usuario ya existe...')
    }

}

async function GetUser(classOfuser:string) {
    try{   
        if(classOfuser==='supervisor') return await supervisorModel.find() 
        if(classOfuser==='watcher') return await watcherModel.find()
        if(classOfuser==='neighbour') return await neighbourModel.find()
    }catch(err:any){
        throw new Error(err)
    }    
}

async function GetUserById(id:any) {
    try{
        let findSupervisor= await supervisorModel.findOne({id:id})
        let findWatcher= await watcherModel.findOne({id:id})
        let findNeighbour= await neighbourModel.findOne({id:id})
        if(findSupervisor!==null) return findSupervisor 
        if(findWatcher!==null) return findWatcher
        if(findNeighbour!==null) return findNeighbour
    }catch(err:any){
        throw new Error(err)
    }    
}

module.exports = {
    SignIn,
    GetUser,
    GetUserById
}