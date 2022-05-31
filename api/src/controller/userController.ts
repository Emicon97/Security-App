import {bossModel, neighbourModel, supervisorModel, watcherModel} from '../models/user';
import { Boss, Supervisor, Watcher, Neighbour } from '../models/user';

// async function getUsers(userClass:string) {
//     try{   
//         if(userClass==='supervisor') return await supervisorModel.find(); 
//         if(userClass==='watcher') return await watcherModel.find();
//         if(userClass==='neighbour') return await neighbourModel.find();
//     }catch(err:any){
//         throw new Error(err.message)
//     }    
// }

async function getUserById(id:string):Promise<[ Boss | Supervisor | Watcher | Neighbour, string ] | string> {
    var response:[ Boss | Supervisor | Watcher | Neighbour, string ];

    let findBoss = await bossModel.findById(id);
    let findSupervisor = await supervisorModel.findById(id);
    let findWatcher = await watcherModel.findById(id);
    let findNeighbour = await neighbourModel.findById(id);
    
    if (findBoss!==null) {
        return response = [findBoss, 'boss'];
    } else if (findSupervisor!==null) {
        return response = [findSupervisor, 'supervisor'];
    } else if (findWatcher!==null) {
        return response = [findWatcher, 'watcher'];
    } else if (findNeighbour!==null) {
        return response = [findNeighbour, 'neighbour'];
    }
    return "This user doesn't exist.";
}

async function getUserByHierarchy(id:string, name?:string) {
    try{
        if (!name) {
            return await getEmployees(id);
        } else {
            return await getEmployeeByName(name);
        }
    }catch(error:any){
        throw new Error(error.message);
    }
}

async function getEmployees (id:string) {
    let boss = await bossModel.findById(id);
    if (boss) {
        // return await bossModel.findOne({ id }, 'supervisor');
        return await supervisorModel.find();
    }else{
        // return await supervisorModel.findOne([id], 'watcher');
        return await watcherModel.find();
    }
}

async function getEmployeeByName (name:string) {

}

async function signUp(name:string, lastName:string, password:string, dni:number, role:string, email:string, telephone:number, workingHours?:string, profilePic?:string) {
    await dniCHecker(dni);
    
    switch (role) {
        case 'watcher':
            const watcher = await watcherModel.create({
                name,
                lastName,
                password,
                dni,
                email,
                telephone,
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
    getUserById,
    getUserByHierarchy,
    deleteUser,
    updateUser
}