import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

const USER_ROLES:string[] = ['boss', 'supervisor', 'watcher'];
const TODO_STATUS:string[] = ['left', 'done'];

class ToDos {
    @prop()
    public name: string;

    @prop({ enum: TODO_STATUS })
    public status: string;
}

class User {

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public lastName!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ enum: USER_ROLES })
    public role!: string;
        
    @prop({ required: true })
    public dni!: number;
        
    @prop()
    public workingHours?: string;
    
    @prop()
    public probilePic?: URL;

    @prop({ ref: () => ToDos })
    public toDos?: Ref<ToDos>[];
    
}

const UserModel = getModelForClass(User);
export default UserModel;