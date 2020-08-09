const mongoose=require('mongoose')
const Schema=mongoose.Schema
const validator=require('validator')

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
        type:Number,
        required:true,
        unique:true,
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v)            
          },
        
          message: function () {
              return 'mobile no should be of 10 digits'
          }
         
      }

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