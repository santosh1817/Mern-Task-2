const mongoose=require('mongoose')
const Schema=mongoose.Schema

const RegisterForm=new Schema({
    username:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    peoples:{
        type:Number,
        required:true

    },
    message:{
        type:String
    },

    timeanddate:{
        type:Date
    }
})