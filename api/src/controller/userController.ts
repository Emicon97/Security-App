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

async function logIn(name:string, lastName:string, dni:number){
    try{
        let findSupervisor= await supervisorModel.find({name,lastName,dni})
        let findWatcher= await watcherModel.find({name,lastName,dni})
        let findNeighbour= await neighbourModel.find({name,lastName,dni})
    }catch(err){
        console.log(err)
    }
}

async function GetUserById(id:string) {
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

async function GetUserByHierarchy(id:string){
    try{
        let boss = await bossModel.findById(id)
        if(boss){
            return await supervisorModel.find()
        }else{
            return await watcherModel.find()
        }
    }catch(error:any){
        throw new Error(error.message);
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
    
    return 'Profile successfully created.';
}

async function dniCHecker (dni:number) {
    await watcherModel.findOne({dni})
    .then((watcher) => {
        if (watcher) {
            throw new Error ("That security guard is already registered in the company's database.");
        }
    })
    .then(async () => {
        return await supervisorModel.findOne({dni});
    })
    .then((supervisor) => {
        if (supervisor) {
            throw new Error ("That supervisor is already registered in the company's database.");
        }
    })
    .then(async () => {
        return await bossModel.findOne({dni});
    })
    .then((boss) => {
        if (boss) {
            throw new Error ('You are already registered in our database.');
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
            return 'Supervisor deleted.';
        }
        if(role==='watcher') {
            await watcherModel.findByIdAndDelete(id);
            return 'Security guard deleted.';
        };
    } catch (err) {
        throw new Error ('The person that you are trying to delete from the database could not be found.');
    }
}

async function updateUser(id:string, role:string, name?:string, lastName?:string, password?:string, dni?:number ,workingHours?:string, probilePic?:string) {
    try{
        
        if(role==='supervisor'){
            
        await supervisorModel.findByIdAndUpdate(id,{
                name, 
                lastName,
                password,
                dni,
                workingHours,
                probilePic
            })
           
            return 'Parameters updated successfully.'
        }
        if(role==='watcher'){
           await watcherModel.findByIdAndUpdate(id,{
                name, 
                lastName,
                password,
                dni,
                workingHours,
                probilePic,
            })
            return 'Parameters updated successfully.'
        }
    }catch(err) {
        throw new Error ('The parameters could not be updated.');
    }
}

module.exports = {
    signUp,
    GetUser,
    GetUserById,
    deleteUser,
    updateUser
}