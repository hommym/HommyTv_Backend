// importing needed module
const express= require("express")
const userAccountCollection= require("../Database/user-account-collection")
const accountCreationMiddleware= require("../middleware/user-error-checker")
const jwt=require("jsonwebtoken")
require("dotenv").config()


const accountRouter=express.Router()




accountRouter.post("/signup",accountCreationMiddleware,async (req,res)=>{

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


accountRouter.get("/login", async(req,res)=>{

 
try {
const {email,password} =req.body 

// checking if the required data was sent together with the request
if(!email || !password){

    res.status(400).json({status:"failed",message:"Bad request"})
}

else{
const account= await userAccountCollection.find({email:email,password:password})


// checking if acount exist in database
if(account.length==1){

const {_id}= account[0]
const token =jwt.sign({id:_id},process.env.SECRETKEYFORJWT,{ expiresIn: '1d' })

res.status(200).json({status:"Succesfull",message:"LogIn Successfully",tokenForAuth:token})




}
else{

    res.status(200).json({satus:"Failed",message:"Invalid email and password"})

}

}


    
} catch (error) {
    
res.status(500).json({satus:"Failed",message:`${error}`})
}

    
})


accountRouter.post("/edit-account-info/name",async (req,res)=>{

const body =req.body

if(body.name){

await userAccountCollection.updateOne({_id:req.userAccount._id},{$set:{name:body.name}})

  return  res.status(200).json({status:"Successfull",message:"Account Name Updated"})


}


res.status(200).json({status:"Failed",message:"No Data Provided For Update"})


})



module.exports=accountRouter