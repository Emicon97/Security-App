import { bossModel, supervisorModel } from '../models/user';

//*Controlador Paginado de Usuarios
//* query
//* id = identifica sobre que usuario hacer el paginado Boss/Supervisor
//* limit = cantidad de usuario para ver por pagina
//* skip = de que usuario empieza a contar ej: 0 igual al primer usuario
//* name = realiza el paginado segun el resultado de la busqueda de nombre
async function getEmployeesPaginatedManager (id:string, limit:number, skip:number, name:string){
    try{
        if(id && limit && skip && !name){
            return await getPaginatedAll(id, limit, skip)
        }else if(id && limit && skip && name){
            return await getPaginatedEmployeesByName(id, limit, skip, name)
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}

//* Realiza el paginado sobre todos los usuarios segun limit y skip
async function getPaginatedAll (id:string, limit:number, skip:number){
    try{
        let boss = await bossModel.findById(id);
        if(boss){
            return await bossModel.findOne({id:id}).populate({
                    path:'supervisor',
                    options:{ limit:limit, skip:skip }
                });
        }else{
            return await supervisorModel.findOne({id:id}).populate(
                {
                    path:'watcher',
                    options:{ limit: limit, skip:skip }
                });
        }
    }catch(error:any){
        throw new Error(error.message);
    }
}

//*Realiza un filtrado especifico segun el resultado de busqueda del nombre con limit y skip
async function getPaginatedEmployeesByName (id:string, limit:number, skip:number, name:string){
    let $regex = escapeStringRegexp(name)
    try{
        let boss = await bossModel.findById(id);
        if(boss){
            return await bossModel.findOne({id:id}).populate({
                path:'supervisor',
                match:{ name: {$regex} },
                options:{ limit:limit, skip:skip }
            })
        }else {
            return await supervisorModel.findOne({id:id}).populate({
                path:'watcher',
                match: { name: {$regex}},
                options:{ limit:limit, skip:skip }
            })
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}

//* funcion que reemplaza el operador LIKE en las busquedas por nombre
function escapeStringRegexp(string:any) {
    if (typeof string !== 'string') {
        throw new TypeError('Expected a string');
    }
    return string
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d');
}

module.exports = {
    getEmployeesPaginatedManager
}