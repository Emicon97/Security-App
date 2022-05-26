import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Supervisor, Watcher } from './user';

const TODO_STATUS:string[] = ['left', 'done'];

export class ToDos {
    @prop({ required: true })
    public name: string;

    @prop()
    public description?: string;

    @prop({ enum: TODO_STATUS, default: 'left' })
    public status: string;

    @prop({ ref: () => Supervisor })
    public supervisor: Ref<Supervisor>;

    @prop({ ref: () => Watcher })
    public watcher: Ref<Watcher>;
}

const toDosModel = getModelForClass(ToDos);
export default toDosModel;