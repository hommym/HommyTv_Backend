const resoucesNotAvialable= (req,res,next)=>{

res.status(404).json({staus:"Succesfull",message:"Resource Unavialable"})


}


module.exports=resoucesNotAvialable