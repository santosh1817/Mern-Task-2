const {Reservation}=require('../models/Reservation')

const reservationMiddleware= function(req,res,next) {

        Reservation.find({date:req.body.date}) 
            .then((reservations)=>{

                let status=true
                if(reservations.length>0){
                    
                    reservations.forEach((reservations)=>{
                        //console.log(reservations)
                        
                        
                        //console.log(req.body.timeSlot,reservations.timeSlot)
                        if(reservations.timeSlot.includes(req.body.timeSlot)){
                            //return res.send({notice:'slot is not there '})
                            status=false
                                                    
                        }
                        
                    })
                    
                    
                    
                }
                if(status==false){
                    res.send({error:`slot ${req.body.timeSlot} is not available for the date ${req.body.date} `})
                }
                else{
                    next()
                }

            })
            .catch(function(err){
                res.send(err)
            })
           
            
        
}
module.exports={
    reservationMiddleware
}