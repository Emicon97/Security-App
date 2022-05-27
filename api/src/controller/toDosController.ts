import toDosModel from '../models/toDos';

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
}

async function getToDosByRole (id:string, role:string) {
  try {
    let toDos = toDosModel.find({[role]: id});
    return toDos;    
  } catch (err) {
    throw new Error ('No se encontraron tareas asignadas');
  }
}

async function assignTask (name:string, description:string | undefined, priority:string, role:string, id:string) {
  try {
    let createToDo = await toDosModel.create({
        name,
        description: description ? description : undefined,
        priority,
        [role]: id
    })
    await createToDo.save()

    return '¡Tarea asignada correctamente!';
  } catch (err) {
    throw new Error ('La tarea no pudo ser asignada...');
  }
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