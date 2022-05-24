import UserModel from '../models/user';

async function SignIn(name:string,lastName:string,password:string,dni:number,role:string, environment:string, toDos:string) {
    let findInDb = await UserModel.findOne({
        dni: dni,
    })
    
    try {
        if(findInDb===null){
            let createUser = await UserModel.create({
                name,
                lastName,
                password,
                role,
                dni,
                environment,
                toDos
            }) 
            createUser.save()
            return 'Usuario creado correctamente...'
        }
    } catch (err:any) {
        throw new Error (err)
        //throw new Error ('El usuario ya existe...')
    }

}

module.exports = {
    SignIn
}