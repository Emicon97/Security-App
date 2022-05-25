import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Boss, Supervisor, Watcher, Neighbour } from './user';

class Environment {
   @prop({ ref: () => Boss})
   public 
}

const environmentModel = getModelForClass(Environment);
export default environmentModel;