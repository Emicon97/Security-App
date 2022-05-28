import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Supervisor, Watcher } from './user';

const TODO_STATUS:string[] = ['left', 'done', 'postponed'];
const PRIORITIES:string[] = ['urgent', 'high', 'regular', 'low'];

export class ToDos {
    @prop({ required: true })
    public name: string;

    @prop()
    public description: string | undefined;

    @prop({ enum: TODO_STATUS, default: 'left' })
    public status: string;

    @prop({ ref: () => Supervisor })
    public supervisor: Ref<Supervisor>;

    @prop({ ref: () => Watcher })
    public watcher: Ref<Watcher>;

    @prop({ enum: PRIORITIES, required: true })
    public priority: string;
}

const toDosModel = getModelForClass(ToDos);
export default toDosModel;