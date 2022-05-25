import { bossModel } from '../models/user';

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

module.exports = {
    SignIn
}