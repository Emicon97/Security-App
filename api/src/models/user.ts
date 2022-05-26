import { prop, Ref, getModelForClass } from '@typegoose/typegoose';

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

export class Boss extends User {
        
    @prop({ required: true, default: [] })
    public environment: string[];

    @prop({ ref: () => Supervisor })
    public supervisor: Ref<Supervisor>[];

}

export class Supervisor extends User {
        
    @prop({ required: true, default: [] })
    public environment: string[];

    @prop({ ref: () => Watcher })
    public watcher: Ref<Watcher>[];
}

export class Watcher extends User {
        
    @prop({ required: true, default: [] })
    public environment: string[];

    @prop({ ref: () => Supervisor })
    public supervisor: Ref<Supervisor>[];
}

export class Neighbour extends User {
        
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