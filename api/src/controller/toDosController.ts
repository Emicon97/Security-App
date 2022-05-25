import { ObjectId } from 'mongoose';
import toDosModel from '../models/toDos';
import { watcherModel } from './../models/user';
const mongoose = require('mongoose');

async function getToDos (id?:string) {
  try {
    if (id) {
      const toDo = await toDosModel.findById(id)
      return toDo;
    } else {
      const allTodos = await toDosModel.find();
      if (allTodos.length > 0 ) {
        return allTodos;
      }
    }
  } catch (err) {
    throw new Error ('No hay tareas asignadas.');
  }
}

async function assignTask(name:string, description:string) {
  try {
    let createToDo = await toDosModel.create({
        name,
        description
    })
    let done = await createToDo.save()

    return done._id;
  } catch (err) {
    throw new Error ('La tarea no pudo ser asignada...')
  }
}

async function assignToWorker(id:string, task) {
  /* try {
    watcherModel.findById(id)
      .then((worker) => {
        console.log(typeof task)
        if (worker !== null) {
          worker.toDos.push(task);
        }
      });
  } catch (err:any) {
    throw new Error (err);
  } */
}

module.exports = {
  getToDos,
  assignTask,
  assignToWorker
}