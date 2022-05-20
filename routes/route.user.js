const router = require('express').Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const {user} = require('../controlers/control.user');


router.get('/users', user.getUsers)
router.get('/users/:id', user.getUser)
router.post('/users', async (req , res )=>{
    try {
        const data =req.body
        const validatedUser = await prisma.user.validator(data)
        console.log(validatedUser)
        const user = await prisma.user.create({
            data : req.body
        })
        res.json(user)
    }catch(error){
        res.json({"message" : error.message})
        console.log(error.message)
    }
})

module.exports = router;