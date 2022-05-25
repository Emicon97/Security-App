import UserModel from '../models/user';
//                                                  Estan seguros que el DNi va a llegar como number?
async function SignIn(name:string,lastName:string,password:string,dni:number,role:string) {
    let findInDb = await UserModel.findOne({
        dni: dni,
    })
    //Ojo con los console.log
    console.log(findInDb)
    if(findInDb===null){
        let createUser = await UserModel.create({
            name: name,
            lastName:lastName,
            password:password,
            role:role,
            dni:dni
        }) 
        createUser.save()
        return 'Usuario creado correctamente...'
    }
    return 'El usuario ya existe...'
}

module.exports = {
    SignIn,
}