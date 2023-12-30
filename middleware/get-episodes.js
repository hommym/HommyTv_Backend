const axios= require("axios")
const {JSDOM}=require("jsdom")



const getEpisodes=async(req,res,next)=>{

    
const{seasonLink}=req.query
const allEpisode=[]
let linkToEpisode=[]
const episodeNumbersText=[]
try {
    if(!seasonLink){

        return  res.status(400).json({status:"Failed",message:"Bad Request"})
      }
      
      let seasonHtmlPage= await axios.get(seasonLink)
      
      let dom= new JSDOM(seasonHtmlPage.data)
      
      
      let pageNav= dom.window.document.querySelector(".page_nav")
      
      
      if(pageNav){
      let nextPageLink=null
      if(pageNav.children[1].textContent.includes("Last")){
      
          nextPageLink=pageNav.children[1].href
      }
      
      
      while(nextPageLink){
       
          seasonHtmlPage= await axios.get(nextPageLink)
          dom= new JSDOM(seasonHtmlPage.data)
          pageNav= dom.window.document.querySelector(".page_nav")
      
          
          dom.window.document.querySelectorAll(".data").forEach((divElement)=>{
      
              const link=divElement.querySelector("a")
               linkToEpisode.unshift(link.href)
             
              
              
              })
      
      
      
                  if(pageNav.children[1].textContent.includes("Prev")){
      
                      nextPageLink=pageNav.children[1].href
                  }
                  else{
      
                      nextPageLink=null
                  }
      
              
      
      
      }
      
      
      
      
      
      }
      else{
      
          dom.window.document.querySelectorAll(".data").forEach((divElement)=>{
      
              const link=divElement.querySelector("a")
               linkToEpisode.push(link.href)
             
              
              
              
              })
      }
      
      
      
      // the purpose of episodeNumberTracker is to know which element in episodeNumbersText list to use
      
      for(const link of linkToEpisode.sort()){
      
      
          const episodeHtmlPage= await axios.get(link)
          const dom1=new JSDOM(episodeHtmlPage.data) 
         
          dom1.window.document.querySelectorAll(".data").forEach(divElement2=>{
         
         
             const linkToEpisodeCaptcha= divElement2.querySelector("a")
             
             if(linkToEpisodeCaptcha.textContent.includes("Mp4")){
         
                 allEpisode.push(linkToEpisodeCaptcha.href)
             }
         
          })
      
          
      }
      
      
      res.allEpisodes=allEpisode
      next()

} catch (error) {
  res.status(500).json({status:"Failed",message:"Server Error"})  
}
}



module.exports=getEpisodes