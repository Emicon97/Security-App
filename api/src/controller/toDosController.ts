import toDosModel from '../models/toDos';
import { supervisorModel, watcherModel } from '../models/user';


async function getToDosManager (id?:string, priority?:string, status?:string) {
  try {
    if (!id) {
      return getAllToDos();
    } else if (id && !priority && !status) {
      return await getToDos(id);
    } else if (id && priority && !status) {
      return await getByIdAndPriority(id, priority);
    } else if (id && !priority && status) {      
      return await getByIdAndStatus(id, status);
    }  else if (id && priority && status) {
      return await getByIdPriorityAndStatus(id, priority, status);
    }
  } catch (err:any) {
    throw new Error (err.message);
  } 
}

async function getAllToDos () {
  const allTodos = await toDosModel.find();
  if (allTodos.length > 0 ) {
    return allTodos;
  }
}

async function getToDos (id:string) {
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
  return toDos;
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

async function getByIdAndPriority (id:string, priority:string) {
  try {
    const role = await workerIdentifier(id);
    let toDos = await toDosModel.find({[role]: id, priority})
    return toDos;
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

function escapeStringRegexp(string:string) {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
}


async function getByIdAndName (id:string, name:string) {
  const $regex = escapeStringRegexp(name)
  try{
    const role = await workerIdentifier(id);
    let toDos = await toDosModel.find({[role]:id, name: {$regex}})
    if(toDos.length !== 0){
      return toDos;
    }else{
      return "No se encontraron tareas con ese nombre"
    }
  }catch(error: any){
    throw new Error (error.message);
  }
}



async function getByIdPriorityAndStatus (id:string, priority:string, status:string) {
  try {
    const role = await workerIdentifier(id);
    let toDos = await toDosModel.find({ [role]: id, priority, status });
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
  getByIdAndName,
  assignTask,
  updateToDo,
  deleteToDo,
}