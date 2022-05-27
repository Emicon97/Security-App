import {bossModel, neighbourModel, supervisorModel, watcherModel} from '../models/user';

async function GetUser(classOfuser:string) {
    try{   
        if(classOfuser==='supervisor') return await supervisorModel.find() 
        if(classOfuser==='watcher') return await watcherModel.find()
        if(classOfuser==='neighbour') return await neighbourModel.find()
    }catch(err:any){
        throw new Error(err.message)
    }    
}

async function GetUserById(id:any) {
    try{
        let findSupervisor= await supervisorModel.findById(id)
        let findWatcher= await watcherModel.findById(id)
        let findNeighbour= await neighbourModel.findById(id)
        if(findSupervisor!==null) return findSupervisor 
        if(findWatcher!==null) return findWatcher
        if(findNeighbour!==null) return findNeighbour
    }catch(err:any){
        throw new Error(err.message)
    }    
}

async function signUp(name:string, lastName:string, password:string, dni:number, role:string, workingHours:string, profilePic:string) {
    await dniCHecker(dni);
    
    switch (role) {
        case 'watcher':
            const watcher = await watcherModel.create({
                name,
                lastName,
                password,
                dni,
                workingHours: workingHours ? workingHours : undefined,
                profilePic: profilePic ? profilePic : undefined
            })
            await watcher.save();
            break;
        case 'supervisor':
            const supervisor = await supervisorModel.create({
                name,
                lastName,
                password,
                dni,
                workingHours: workingHours ? workingHours : undefined,
                profilePic: profilePic ? profilePic : undefined
            })
            await supervisor.save();
            break;
        case 'boss':
            const boss = await bossModel.create({
                name,
                lastName,
                password,
                dni,
                profilePic: profilePic ? profilePic : undefined
                
            });
            await boss.save();
            break;
    }
    
    return 'Perfil creado exitosamente.';
}

async function dniCHecker (dni:number) {
    await watcherModel.findOne({dni})
    .then((watcher) => {
        if (watcher) {
            throw new Error ('Ese guardia ya está registrado en esta empresa.');
        }
    })
    .then(async () => {
        return await supervisorModel.findOne({dni});
    })
    .then((supervisor) => {
        if (supervisor) {
            throw new Error ('Ese supervisor ya está registrado en esta empresa.');
        }
    })
    .then(async () => {
        return await bossModel.findOne({dni});
    })
    .then((boss) => {
        if (boss) {
            throw new Error ('Usted ya está registrado en esta empresa.');
        }
    })
    .catch((err) => {
        throw new Error (err.message);
    })

}

async function deleteUser (id:string, role:string) {
    try {
        if(role==='supervisor') {
            await supervisorModel.findByIdAndDelete(id);
            return 'Supervisor eliminado.';
        }
        if(role==='watcher') {
            await watcherModel.findByIdAndDelete(id);
            return 'Guardia eliminado.';
        };
    } catch (err) {
        throw new Error ('No se encontró a la persona que intenta eliminar en la base de datos');
    }
}

async function updateUser(id:string, role:string, name?:string, lastName?:string, password?:string, dni?:number ,workingHours?:string, probilePic?:string) {
    try{
        if(role==='supervisor'){
            await supervisorModel.findByIdAndUpdate(id,{
                name:name, 
                lastName:lastName,
                password:password,
                dni:dni,
                workingHours:workingHours,
                probilePic:probilePic
            })
            return 'cambios registrado correctamente'
        }
        if(role==='watcher'){
          const data=  await watcherModel.findByIdAndUpdate(id,{
                name:name, 
                lastName:lastName,
                password:password,
                dni:dni,
                workingHours:workingHours,
                probilePic:probilePic,
            })
            return 'cambios registrado correctamente'
        }
    }catch(err) {
        throw new Error ('No se encontró a la persona que intenta eliminar en la base de datos');
    }
}

module.exports = {
    signUp,
    GetUser,
    GetUserById,
    deleteUser,
    updateUser
}