const {Reservation}=require('../models/Reservation')

const reservationMiddleware= function(req,res,next) {

        Reservation.find({date:req.body.date}) 
            .then((reservations)=>{

                let status=true
                if(reservations.length>0){
                    
                    reservations.forEach((reservations)=>{
                       
                        
                        if(reservations.timeSlot.includes(req.body.timeSlot)){

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