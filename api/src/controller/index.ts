import UserModel from '../models/user';

async function SignIn(name:string,lastName:string,password:string,dni:number,role:string) {
    let findInDb = await UserModel.findOne({
        dni: dni,
    })
    console.log(findInDb)
    if(findInDb===null){
        let createUser = await UserModel.create({
            name,
            lastName,
            password,
            role,
            dni
        }) 
        createUser.save()
        return 'Usuario creado correctamente...'
    }
    return 'El usuario ya existe...'
}

module.exports = {
    SignIn,
}