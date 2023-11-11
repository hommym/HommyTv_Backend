const express= require("express")

const router=express.Router()

const {networkRequestsToTmdb}=require('./request_for_content_at_tmd')



router.get('/top_rated', async (req,res)=>{


    let numberOfSeries=0
    let listOfSeriesToSend =[]
    

  // the networkRequestToTmdb makes request the tmdb server and then send the responds or error to our client
  await networkRequestsToTmdb( listOfSeriesToSend,numberOfSeries,"https://api.themoviedb.org/3/tv/top_rated?api_key=5df9d8434a271efeaf152516c002398d",res)



})


router.get('/airing_today',async (req,res)=>{


    let numberOfSeries=0
    let listOfSeriesToSend =[]
    
  // the networkRequestToTmdb makes request the tmdb server and then send the responds or error to our client
  await networkRequestsToTmdb( listOfSeriesToSend,numberOfSeries,"https://api.themoviedb.org/3/tv/airing_today?api_key=5df9d8434a271efeaf152516c002398d",res)


    

})


router.get('/popular',async (req,res)=>{


    let numberOfSeries=0
    let listOfSeriesToSend =[]

      // the networkRequestToTmdb makes request the tmdb server and then send the responds or error to our client
  await networkRequestsToTmdb( listOfSeriesToSend,numberOfSeries,"https://api.themoviedb.org/3/tv/popular?api_key=5df9d8434a271efeaf152516c002398d",res)



})





module.exports={router}