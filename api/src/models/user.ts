const  { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // lastname:{
    //     type: String,
    // },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    // location:{
    //     type: String,
    //     trim: true
    // },
    // status:{
    //     type: String,
    //     enum: ["Jefe", "Supervisor", "Guardia"],
    // },
    // image:{
    //     type: String
    // },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
}, {
    versionKey: false,
    timestamps: false,
})

export default model('User', userSchema)