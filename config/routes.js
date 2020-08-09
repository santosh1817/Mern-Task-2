const express=require('express')
const router=express.Router()
const {usersRouter}=require('../app/controllers/UserController')
const {reservationsRouter}=require('../app/controllers/ReservationController')

router.use('/users',usersRouter)
router.use('/reservation',reservationsRouter)

module.exports={
    routes:router
}