// importing needed module
const express= require("express")
const userAccountCollection= require("../Database/user-account-collection")
const accountCreationMiddleware= require("../middleware/user-error-checker")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const fileSys= require("fs/promises")


const accountRouter=express.Router()




accountRouter.post("/signup",accountCreationMiddleware,async (req,res)=>{

    const body= req.body
    // performig necessar convertion to the data in request object
  body.phone=Number(body.phone)

// checking if male or female was passed for gender property in body object in order to avoid 
// in order to avoid any error when setting default profile images 

  if(body.gender!=="male" && body.gender!=="female"){

    return res.status(400).json({status:"Failed",message:"Bad Request"})
  }

    try {

        // setting the default profile image
        body.profileImage=await fileSys.readFile(`./Default-Profile-Images/${body.gender}.jpg`)


    await userAccountCollection.create(body)

        res.status(201).json({staus:"Successful",message:`Account with name ${body.name} has being created successfully`})
        

    } catch (error) {
        

        res.status(500).json({status:"Error",message:"Internal server error"})
        console.log(error);

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


accountRouter.post("/edit-account-info/:infoToUpdate",async (req,res)=>{

        const body =req.body
        const {infoToUpdate}=req.params
        const objectOfUpdatedData={}


        


            if(infoToUpdate==="name" && body.name){

                objectOfUpdatedData.name=body.name
            }

            else if(infoToUpdate==="email" && body.email){

                objectOfUpdatedData.email=body.email
            }

            else if(infoToUpdate==="phone" && body.phone){
                
                objectOfUpdatedData.phone=body.phone

            }

            else if(infoToUpdate==="password" && body.password){
                objectOfUpdatedData.password=body.password

            }

            else if(infoToUpdate==="profile" && body.profileImage){

                // the Buffer.from() is converting the binary data in body.profileImage which is in String into a Buffer Object
                objectOfUpdatedData.profileImage=Buffer.from(body.profileImage,"utf-8")

            }

            else{
              return  res.status(400).json({status:"Failed",message:"Bad Request"})
            }

        

        
        // updating the user data in database 
        await userAccountCollection.updateOne({_id:req.userAccount._id},{$set:objectOfUpdatedData})
         res.status(200).json({status:"Successfull",message:`account ${infoToUpdate} updated`})
        
        
        
        
        
      
        
        
        })







module.exports=accountRouter