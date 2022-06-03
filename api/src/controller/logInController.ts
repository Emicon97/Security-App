import { bossModel, supervisorModel, watcherModel } from '../models/user';
import { sessionModel } from '../models/session';

async function logIn (dni:number, password:string) {
    if(dni && password){
        try{
            let findBoss = await bossModel.findOne({dni, password});
            let findSupervisor= await supervisorModel.findOne({dni, password});
            let findWatcher= await watcherModel.findOne({dni, password});
            if(findBoss!==null) return findBoss;
            if(findSupervisor!==null) return findSupervisor;
            if(findWatcher!==null) return findWatcher;
            return false;
        }catch(err){
            console.log(err);
        }
    } else {
        throw new Error('Complete the required fields.');
    }
}

async function idIdentifier (paramsId:string) {
    let session = await sessionModel.findOne({ user: paramsId });
    if (session) return;

    throw new Error ('ESTE ES UN ERROR');
}

module.exports={
    logIn,
    idIdentifier
}