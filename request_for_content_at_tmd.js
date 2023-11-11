async function networkRequestsToTmdb(listOfContentToSend,numberOfContent,requestUrl,res){


    try{

        // retreiving all content needed
        let content= await fetch(requestUrl)
    
        // converting the respose into json
        content= await content.json()
    
        // geting the movie detailes that is all information about the content
        for(const item of content.results){
    
            let contentToAddTolist=await fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=5df9d8434a271efeaf152516c002398d`)
    
            contentToAddTolist= await contentToAddTolist.json()
    
            contentToAddTolist.poster_path=`https://image.tmdb.org/t/p/original${contentToAddTolist.poster_path}`
    
            contentToAddTolist.backdrop_path=`https://image.tmdb.org/t/p/original${contentToAddTolist.backdrop_path}`
    
    
            listOfContentToSend.push(contentToAddTolist)
            numberOfContent++
            // if(numberOfMovies===1){
            //     break
            // }
    
        }
    
    
    }
     
    catch(err){
    res.status(500)
    return res.json({error:"Internal Error In Server Try again"})
    
    }



    res.json({listOfContent:listOfContentToSend})



}



module.exports={networkRequestsToTmdb}