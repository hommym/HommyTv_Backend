// importing needed module
const express= require("express")
const databaseConnector=require("./Database/connectDb")
const accountRouter=require("./Routes/acount-route")
const  seriesRouter=require("./Routes/content-route")
const resourceNotAvialableMiddleware=require("./middleware/resource-unavialable-middleware")
require("dotenv").config()
const jwtAuth=require("./middleware/jwt-authenticator")
const passport= require("passport")
const GoogleStrategy=require('passport-google-oauth20').Strategy
const session=require("express-session")



// creating the server object
const app=express()



// setting up the json body parser
app.use(express.json())

//  setting up the middleware for verifying jwt 
app.use("/api/v1/account/edit-account-info",jwtAuth)



// setting up middleware for Google OAuth
app.use("/api/v1/account/googleOAuth",session({ secret: process.env.SECRETKEYFORJWT, resave: false, saveUninitialized: false }))
app.use("/api/v1/account/googleOAuth",passport.initialize())
app.use("/api/v1/account/googleOAuth",passport.session())



// setting up tool required for OAuth with google

passport.use(new GoogleStrategy({
    clientID: process.env.GoogeleClientId,
    clientSecret: process.env.GoogleClientSecret,
    callbackURL: 'http://localhost:3000/api/v1/account/googleOAuth/callbackUrl'
  },(accessToken,refreshToken,profile,done )=>{

    // perform actions when authentication is done

    console.log(profile);
     return done(null, profile)   
  }))


  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });


// setting up routers
app.use("/api/v1/account",accountRouter)

app.use("/api/v1/content",jwtAuth,seriesRouter)


// midlleware for unavialable resources
app.use(resourceNotAvialableMiddleware)







const portNumber=(process.env.PORT)?process.env.PORT:3000

// function for starting the server

async function startApp(){

// connecting to database
await databaseConnector(process.env.DBCONNECTIONSTRING)


// listening to server port
app.listen(portNumber,()=>{

    console.log(`Server is listening to port ${portNumber}....`);
    
    })

}


// starting server
startApp()







