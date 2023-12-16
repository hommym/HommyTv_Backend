// importing mongoose
const mongoose=require("mongoose")



const connection= async (connectionString)=>{


return mongoose.connect(connectionString,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true})

}



module.exports=connection
