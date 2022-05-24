import UserModel from '../models/user';

async function SignIn(name:string,lastName:string,password:string,dni:number,role:string, environment:string) {
    let findInDb = await UserModel.findOne({
        dni: dni,
    })

<<<<<<< HEAD
    try {
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
    } catch (err) {
        throw new Error ('El usuario ya existe...')
=======
    if(findInDb===null){
        let createUser = await UserModel.create({
            name,
            lastName,
            password,
            role,
            dni,
            environment
        }) 
        createUser.save()
        return 'Usuario creado correctamente...'
>>>>>>> 9558f6bd4b7acaf3b557941c98d58a4f9a55c649
    }

}

module.exports = {
    SignIn,
}