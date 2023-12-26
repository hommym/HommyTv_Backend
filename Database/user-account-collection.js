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

profileImage:Buffer,

searchHistory:{
    type:Array,
    default:[]
    
},

gender:{
    type:String,
    enum:["male","female"],
    required:true
},

age:{
    type:String,
    required:true
},

watchlater:{
    type:Array,
    default:[]
},


favorite:{
    type:Array,
    default:[]
}




})


const modelForUserAccountCollection=mongoose.model("UserAccount",schemaForUserAccountCollection)



module.exports=modelForUserAccountCollection