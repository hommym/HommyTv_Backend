const express= require("express")
const getContent=require("../middleware/get-content")
const getEpisodes=require("../middleware/get-episodes")
const getVideo=require("../middleware/get-video")

require("dotenv").config()

const contentRouter= express.Router()



// route for getting links to all the episode of a season of a series
contentRouter.get("/episodes",getEpisodes,async(req,res)=>{


    res.status(200).json({allEpisodes:res.allEpisodes})

})



// route for getting videos 
contentRouter.get("/:mediaType/video",getVideo,(req,res)=>{




    res.end("Successs")
})




// route for getting series and movie content
contentRouter.get("/:mediaType",getContent, async(req,res)=>{

    const {mediaType}=req.params



    if(mediaType==="series"){

        // sending the links to all the season
        res.json({seasons:res.allEpisodes})


    }
    else{

//  sending the link to the movie(has not been implemented)
    res.end("Not implemented")

    }
    
})






module.exports=contentRouter
