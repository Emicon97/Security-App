import { prop, Ref, getModelForClass } from '@typegoose/typegoose';

const TODO_STATUS:string[] = ['left', 'done'];

export class ToDos {
    @prop()
    public name: string;

    @prop({ enum: TODO_STATUS })
    public status: string;
}

const toDosModel = getModelForClass(ToDos);
export default toDosModel;