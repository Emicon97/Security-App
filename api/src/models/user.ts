import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

const USER_ROLES:string[] = ['boss', 'supervisor', 'watcher'];
const TODO_STATUS:string[] = ['left', 'done'];

class ToDos {
    @prop()
    public name: string;

    @prop({ type: String, enum: TODO_STATUS })
    public status: string;
}

class User {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public lastName!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ type: String, enum: USER_ROLES })
    public role!: string;
        
    @prop({ required: true })
    public dni!: number;
        
    @prop()
    public workingHours?: string;
    
    @prop()
    public probilePic?: URL;

    @prop({ ref: () => ToDos })
    public toDos?: Ref<ToDos>[];
    
    //     email: {
    //         type: String,
    //         required: true,
    //         unique: true,
    //     },
    //     // date: {
    //     //     type: Date,
    //     //     default: Date.now
    //     // }
    // }, {
    //     versionKey: false,
    //     timestamps: false,

}


// const userSchema = new Schema({
// })

const UserModel = getModelForClass(User);
export default UserModel



// export default model('User', userSchema)