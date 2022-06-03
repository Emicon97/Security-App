import { prop, Ref, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { Supervisor, Watcher } from './user';

const TODO_STATUS:string[] = ['left', 'done', 'postponed'];
const PRIORITIES:string[] = ['urgent', 'high', 'regular', 'low'];
@modelOptions({options: { allowMixed: Severity.ALLOW}})
export class ToDos {
    @prop({ required: true })
    public name: string;

    @prop()
    public description?: string;

    @prop({ enum: TODO_STATUS, default: 'left' })
    public status: string;

    @prop({ ref: () => Supervisor || Watcher })
    public responsible: Ref<Supervisor> |  Ref<Watcher>;

    @prop({ enum: PRIORITIES, required: true })
    public priority: string;
}

const toDosModel = getModelForClass(ToDos);
export default toDosModel;