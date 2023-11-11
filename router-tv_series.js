const express= require("express")

const router=express.Router()



router.get('/top_rated', async (req,res)=>{


    let numberOfSeries=0
    let listOfSeriesToSend =[]
    
        // retreiving all top rated series
        let topRatedSeries= await fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=5df9d8434a271efeaf152516c002398d")
    
        // converting the respose into json
        topRatedSeries= await  topRatedSeries.json()
    
        // geting the movie detailes that is all information about the movie
        for(const series of  topRatedSeries.results){
    
            let seriesToAddTolist=await fetch(`https://api.themoviedb.org/3/tv/${series.id}?api_key=5df9d8434a271efeaf152516c002398d`)
    
            seriesToAddTolist= await seriesToAddTolist.json()
    
            seriesToAddTolist.poster_path=`https://image.tmdb.org/t/p/original${seriesToAddTolist.poster_path}`
    
            seriesToAddTolist.backdrop_path=`https://image.tmdb.org/t/p/original${seriesToAddTolist.backdrop_path}`
    
    
            listOfSeriesToSend.push(seriesToAddTolist)
            numberOfSeries++
            // if(numberOfSeries===1){
            //     break
            // }
    
        }
    
    
    
        res.json({listOfSeries:listOfSeriesToSend})
    
    
    


})


router.get('/airing_today',async (req,res)=>{


    let numberOfSeries=0
    let listOfSeriesToSend =[]
    
        // retreiving all  series which aring currently
        let currentlyAiringSeries= await fetch("https://api.themoviedb.org/3/tv/airing_today?api_key=5df9d8434a271efeaf152516c002398d")
    
        // converting the respose into json
        currentlyAiringSeries= await  currentlyAiringSeries.json()
    
        // geting the movie detailes that is all information about the movie
        for(const series of  currentlyAiringSeries.results){
    
            let seriesToAddTolist=await fetch(`https://api.themoviedb.org/3/tv/${series.id}?api_key=5df9d8434a271efeaf152516c002398d`)
    
            seriesToAddTolist= await seriesToAddTolist.json()
    
            seriesToAddTolist.poster_path=`https://image.tmdb.org/t/p/original${seriesToAddTolist.poster_path}`
    
            seriesToAddTolist.backdrop_path=`https://image.tmdb.org/t/p/original${seriesToAddTolist.backdrop_path}`
    
    
            listOfSeriesToSend.push(seriesToAddTolist)
            numberOfSeries++
            // if(numberOfSeries===1){
            //     break
            // }
    
        }
    
    
    
        res.json({listOfSeries:listOfSeriesToSend})
    


})


router.get('/popular',async (req,res)=>{


    let numberOfSeries=0
    let listOfSeriesToSend =[]
    
        // retreiving all  series which aring currently
        let popularSeries= await fetch("https://api.themoviedb.org/3/tv/popular?api_key=5df9d8434a271efeaf152516c002398d")
    
        // converting the respose into json
        popularSeries= await  currentlyAiringSeries.json()
    
        // geting the movie detailes that is all information about the movie
        for(const series of  popularSeries.results){
    
            let seriesToAddTolist=await fetch(`https://api.themoviedb.org/3/tv/${series.id}?api_key=5df9d8434a271efeaf152516c002398d`)
    
            seriesToAddTolist= await seriesToAddTolist.json()
    
            seriesToAddTolist.poster_path=`https://image.tmdb.org/t/p/original${seriesToAddTolist.poster_path}`
    
            seriesToAddTolist.backdrop_path=`https://image.tmdb.org/t/p/original${seriesToAddTolist.backdrop_path}`
    
    
            listOfSeriesToSend.push(seriesToAddTolist)
            numberOfSeries++
            // if(numberOfSeries===1){
            //     break
            // }
    
        }
    
    
    
        res.json({listOfSeries:listOfSeriesToSend})
    


})





module.exports={router}