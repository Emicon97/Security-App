import UserModel from '../models/toDos';

async function assignTask(name:string, description:string) {
    try {
      let createUser = await UserModel.create({
         name,
         description
      }) 
      createUser.save()
      return 'Tarea asignada correctamente...'
    } catch (err) {
      throw new Error ('La tarea no pudo ser asignada...')
    }
}

module.exports = {
   assignTask
}