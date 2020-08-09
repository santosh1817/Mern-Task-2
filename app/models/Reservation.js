const mongoose=require('mongoose')
const Schema=mongoose.Schema

const reservationSchema=new Schema({

    username:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    timeSlot:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true

    },
    service:{
        type:String,
        required:true
    },
    message:{
        type:String
    }

})

const Reservation=mongoose.model('Reservation',reservationSchema)
module.exports={Reservation}