import toDosModel from '../models/toDos';
import { watcherModel } from './../models/user';

async function assignTask(name:string, description:string) {
    try {
      let createToDo = await toDosModel.create({
         name,
         description
      })
      let done = createToDo.save()
      console.log(done);
      return 'Tarea asignada correctamente...'
    } catch (err) {
      throw new Error ('La tarea no pudo ser asignada...')
    }
}

async function assignToWorker(id:string) {
  try {
    let worker = watcherModel.findById(id);
    worker.toDos.push()
  } catch (err:any) {
    throw new Error (err);
  }
}

module.exports = {
   assignTask,
   assignToWorker
}