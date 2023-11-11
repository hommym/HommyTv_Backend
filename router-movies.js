const express= require("express")
const {networkRequestsToTmdb}=require('./request_for_content_at_tmd')

const router= express.Router()


router.get("/recent", async (req,res)=>{

let numberOfMovies=0
let listOfMoviesToSend =[]

// the networkRequestToTmdb makes request the tmdb server and then send the responds or error to our client
 await networkRequestsToTmdb(listOfMoviesToSend,numberOfMovies,"https://api.themoviedb.org/3/movie/popular?api_key=5df9d8434a271efeaf152516c002398d",res)

})

router.get("/upcoming", async (req,res)=>{

    
let numberOfMovies=0
let listOfMoviesToSend =[]


// the networkRequestToTmdb makes request the tmdb server and then send the responds or error to our client
await networkRequestsToTmdb(listOfMoviesToSend,numberOfMovies,"https://api.themoviedb.org/3/discover/movie?api_key=5df9d8434a271efeaf152516c002398d&primary_release_year=2024|2025",res)






})


router.get("/top_rated" ,async (req,res)=>{



    let numberOfMovies=0
    let listOfMoviesToSend =[]

    // the networkRequestToTmdb makes request the tmdb server and then send the responds or error to our client
await networkRequestsToTmdb(listOfMoviesToSend,numberOfMovies,"https://api.themoviedb.org/3/movie/top_rated?api_key=5df9d8434a271efeaf152516c002398d",res)
    

    
    
    


})

router.get("/now_playing",async(req,res)=>{

    let numberOfMovies=0
    let listOfMoviesToSend =[]
    
  // the networkRequestToTmdb makes request the tmdb server and then send the responds or error to our client
  await networkRequestsToTmdb(listOfMoviesToSend,numberOfMovies,"https://api.themoviedb.org/3/movie/now_playing?api_key=5df9d8434a271efeaf152516c002398d",res)
     
})

module.exports={router}