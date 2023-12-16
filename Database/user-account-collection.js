// importing mongoose
const mongoose=require("mongoose")


const schemaForUserAccountCollection= new mongoose.Schema({
name:{
    type:String,
    required:true
},

phone:{
    type:Number,
    required:true
},

email:{
    type:String,
    required:true
},

password:{
type:String,
required:true

},
isProfileset:{
    type:Boolean,
    default:false
},

profileImage:Buffer



})


const modelForUserAccountCollection=mongoose.model("UserAccount",schemaForUserAccountCollection)



module.exports=modelForUserAccountCollection