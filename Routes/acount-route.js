// importing needed module
const express= require("express")
const userAccountCollection= require("../Database/user-account-collection")



const accountRouter=express.Router()

// this route will have a middleware for checking if all the required data is present(not implemented)
accountRouter.post("/signup",async (req,res)=>{

    const body= req.body
    // performig necessar convertion to the data in request object
  body.phone=Number(body.phone)



    try {

    await userAccountCollection.create(body)

        res.status(201).json({staus:"Successful",message:`Account with name ${body.name} has being created successfully`})
        

    } catch (error) {
        

        res.status(500).json({status:"Error",message:"Internal server error"})

    }


})




module.exports=accountRouter