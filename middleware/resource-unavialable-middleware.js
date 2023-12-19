const resoucesNotAvialable= (req,res,next)=>{

res.status(400).json({staus:"Succesfull",message:"Resource Unavialable"})


}


module.exports=resoucesNotAvialable