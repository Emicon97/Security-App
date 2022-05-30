import toDosModel from '../models/toDos';
import { supervisorModel, watcherModel } from '../models/user';


async function getToDosManager (id?:string, priority?:string) {
  if (!priority) {
    console.log('hola')
  } else {
    console.log('chau')
  }
}

async function getToDos (id?:string, priority?:string) {
  if (id) {
    // First check if the id belongs to a task.
    // Primero revisá si el id pertenece a una tarea.
    let toDos = await toDosModel.findById(id)
      .then(async (toDo) => {
        if (toDo !== null) {
          // If something was found, return it.
          // Si se encontró algo, devolvelo.
          return toDo;
        } else {
          // Else, check if it's a worker's id.
          // Si no, fijate si es la id de un trabajador.
          return await getToDosByRole(id);
        }
      })
      .catch((err) => {
        throw new Error (err.message);
      });
    
    console.log(toDos);
    return toDos;
  } else {
    // No id? Get them all!
    // ¿No se recibió una id? ¡Buscá todas!
    const allTodos = await toDosModel.find();
    if (allTodos.length > 0 ) {
      return allTodos;
    }
  }
}

async function getToDosByRole (id:string) {
  try {  
    const role = await workerIdentifier(id);
    let toDos = await toDosModel.find({[role]: id});
    return toDos;
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function getToDosByPriority (id:string, priority:string) {
  try {
    const role = await workerIdentifier(id);
    let toDos = await toDosModel.find({[role]: id, priority})
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function getByIdAndStatus (id:string, status:string) {
  try {
    const role = await workerIdentifier(id);
    let toDos = await toDosModel.find({ [role]: id, status });
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

    return 'Task successfully assigned.';
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function workerIdentifier (id:string) {
  const isSupervisor = await supervisorModel.findById(id);
  if (isSupervisor !== null) return 'supervisor';
  const isWatcher = await watcherModel.findById(id); 
  if (isWatcher !== null) return 'watcher';
  throw new Error ("This worker hasn't been found in our database.");
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
    throw new Error ('Please complete all required fields.')
  }
}

async function deleteToDo (id:string) {
  try {
    await toDosModel.findByIdAndDelete(id);
    return 'Task has been successfully deleted.';
  } catch (err) {
    throw new Error ('The task does not exist.');
  }
}

module.exports = {
  getToDosManager,
  getToDos,
  getToDosByRole,
  getByIdAndStatus,
  assignTask,
  updateToDo,
  deleteToDo
}