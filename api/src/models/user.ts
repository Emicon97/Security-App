import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import {ToDos} from './toDos';

class User {
    @prop({ required: true, lowercase:true,trim:true})
    public name!: string;

    @prop({ required: true, lowercase:true,trim:true})
    public lastName!: string;

    @prop({ required: true })
    public password!: string;
        
    @prop({ required: true })
    public dni!: number;
    
    @prop()
    public workingHours?: string;
    
    @prop({lowercase:true,trim:true})
    public probilePic?: string;
}

class Boss extends User {
        
    @prop()
    public environment: string[];
}

class Supervisor extends User {
        
    @prop({ required: true })
    public environment: string[];

    @prop({ ref: () => ToDos })
    public toDos: Ref<ToDos>;
}

class Watcher extends User {
        
    @prop({ required: true })
    public environment: string[];

    @prop({ ref: () => ToDos })
    public toDos: Ref<ToDos>;
}

class Neighbour extends User {
        
    @prop({ required: true })
    public environment: string[];
}

const bossModel = getModelForClass(Boss);
const supervisorModel = getModelForClass(Supervisor);
const watcherModel = getModelForClass(Watcher);
const neighbourModel = getModelForClass(Neighbour);
export {
    bossModel,
    supervisorModel,
    watcherModel,
    neighbourModel
};