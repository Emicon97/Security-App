import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Boss, Supervisor, Watcher } from './user';

class Session {
    
   @prop({ required: true, ref: () => Boss || Supervisor || Watcher })
   public user: Ref<Boss> | Ref<Supervisor> | Ref<Watcher>;
}


const sessionModel = getModelForClass(Session);
export {
   sessionModel
};