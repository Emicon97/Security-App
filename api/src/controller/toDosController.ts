import toDosModel from '../models/toDos';
import { supervisorModel, watcherModel } from '../models/user';

async function getToDos (id?:string) {
  if (id) {
    const toDo = await toDosModel.findById(id)
    return toDo;
  } else {
    const allTodos = await toDosModel.find();
    if (allTodos.length > 0 ) {
      return allTodos;
    }
  }
  console.log('llegué')
}

async function getToDosByRole (id:string) {
  try {  
    const role = await workerIdentifier(id);
    console.log(role)
    let toDos = await toDosModel.find({[role]: id});
    console.log(toDos)
    return toDos;
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function assignTask (name:string, description:string | undefined, priority:string, id:string) {
  try {
    const role = await workerIdentifier(id);
    let createToDo = await toDosModel.create({
        name,
        description: description ? description : undefined,
        priority,
        [role]: id
    })
    await createToDo.save()

    return '¡Tarea asignada correctamente!';
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function workerIdentifier (id:string) {
  const isSupervisor = await supervisorModel.findById(id);
  if (isSupervisor !== null) return 'supervisor';
  const isWatcher = await watcherModel.findById(id); 
  if (isWatcher !== null) return 'watcher';
  throw new Error ('Ese trabajador no se encuentra registrado en la base de datos');
}

async function updateToDo (id:string, name:string, description:string, status:string) {
  try {
    let data = await toDosModel.findByIdAndUpdate(id, {
      name,
      description,
      status
    });
    return data;
  } catch (err) {
    throw new Error ('Por favor indique todos los parámetros necesarios.')
  }
}

async function deleteToDo (id:string) {
  try {
    await toDosModel.findByIdAndDelete(id);
    return 'La tarea fue borrada con éxito.';
  } catch (err) {
    throw new Error ('La tarea no existe.');
  }
}

module.exports = {
  getToDos,
  getToDosByRole,
  assignTask,
  updateToDo,
  deleteToDo
}