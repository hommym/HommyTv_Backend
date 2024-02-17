// importing required modules

const databaseMethods= require("../Database/user-account-collection.js")
const axios= require("axios")
const fileSys= require("fs/promises")



const accountChecker= async (email,password,user)=>{


    // if password is null it mean user Authentication is through OAuth

    if(password!==null && email!==null){

        // checking for account in database
        const account= await  databaseMethods.find({email:email,password:password})
        if(account.length===1){


            return account[0]._id
        }
        else{
            return null
        }


    }


    else{

            // checking for account in database
        
            const account= await  databaseMethods.find({email:user.emails[0].value})
            if(account.length===1){
    
    
                return account[0]._id
            }
            else{
                const body= {email:user.emails[0].value}

                // setting name property of the object for account creation
                body.name=user.displayName
                // checking if user's account has a profile
                if(user.photos.length>1){
                    const response = await axios.get(user.photos[0].value,  { responseType: 'Buffer' })
                    body.profileImage = Buffer.from(response.data, "utf-8")

                }
                else{

                     // setting the default profile image
                    body.profileImage=await fileSys.readFile(`./Default-Profile-Images/male.jpg`)

                }


                const account1= await databaseMethods.create(body)


                return account1._id


            }
    




    }







}


module.exports=accountChecker