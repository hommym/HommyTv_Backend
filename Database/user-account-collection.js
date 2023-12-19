// importing mongoose
const mongoose=require("mongoose")


const schemaForUserAccountCollection= new mongoose.Schema({
name:{
    type:String,
    required:true,
    minlength:3
},

phone:{
    type:Number,
    required:true
},

email:{
    type:String,
    required:true,
    minlength:10
},

password:{
type:String,
required:true,
minlength:4

},
isProfileset:{
    type:Boolean,
    default:false
},

profileImage:Buffer



})


const modelForUserAccountCollection=mongoose.model("UserAccount",schemaForUserAccountCollection)



module.exports=modelForUserAccountCollection