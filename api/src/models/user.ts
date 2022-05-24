import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import {ToDos} from './toDos';

const USER_ROLES:string[] = ['boss', 'supervisor', 'watcher'];

class User {

    @prop({ required: true, lowercase:true,trim:true})
    public name!: string;

    @prop({ required: true, lowercase:true,trim:true})
    public lastName!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ enum: USER_ROLES })
    public role!: string;
        
    @prop({ required: true })
    public dni!: number;
        
    @prop()
    public workingHours?: string;
    
    @prop({lowercase:true,trim:true})
    public probilePic?: string;

    @prop({ ref: () => ToDos })
    public toDos?: Ref<ToDos>[];
    
}

const UserModel = getModelForClass(User);
export default UserModel;