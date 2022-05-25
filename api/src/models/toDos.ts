import { prop, Ref, getModelForClass } from '@typegoose/typegoose';

const TODO_STATUS:string[] = ['left', 'done'];

export class ToDos {
    @prop({ required: true })
    public name: string;

    @prop()
    public description?: string;

    @prop({ enum: TODO_STATUS, default: 'left' })
    public status: string;
}

const toDosModel = getModelForClass(ToDos);
export default toDosModel;