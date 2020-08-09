const express=require('express')
const router=express.Router()
const {User}=require('../models/User')
const {Reservation}=require('../models/Reservation')
const {reservationMiddleware}=require('../middleware/reservationMiddleware')
const { authenticateUser}=require('../middleware/authentication')


router.post('/create',authenticateUser,reservationMiddleware,(req,res)=>{
      
    const reservation=new Reservation(req.body)
    reservation.save()
    .then(response=>{
        res.send(response)
    })       
    .catch(err=>{
        res.send(err)
    })
})

router.get('/view',authenticateUser,(req,res)=>{

    Reservation.find().populate('username','username')
    .then(response=>{

        let filteredReservations=[]
        response.forEach((item)=>{
            
            if(item.username._id.toString()===req.user._id.toString()){

                filteredReservations.push(item)
            }
        })
        res.send(filteredReservations)
    })
    .catch(err=>{
        res.send(err)
    })

})

router.post('/find-slots',authenticateUser, async (req,res)=>{

    try{
        let slotArray=[]
        let response =await Reservation.find({date:req.body.date})
        response.forEach((reservation)=>{
            slotArray.push(reservation.timeSlot)
        })
        return res.send(slotArray)
    }catch(e){
        return res.send(e)
    }
})


module.exports={
    reservationsRouter:router
}