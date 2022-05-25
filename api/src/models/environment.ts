import { prop, Ref, getModelForClass } from '@typegoose/typegoose';

class Environment {

}

const environmentModel = getModelForClass(Environment);
export default environmentModel;