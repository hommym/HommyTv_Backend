const axios= require("axios")
const {JSDOM}=require("jsdom")
const { default: puppeteer } = require("puppeteer")
const pupppeteer=require("puppeteer")
const fileSys= require("fs/promises")
const path=require("path")
const { createWorker }= require("tesseract.js")


 async function getTextFromImage(){

    const worker = await createWorker('eng');
    const ret = await worker.recognize(path.join(__dirname,"/temp-files/one.png"));
    await worker.terminate();
    return ret.data.text
}


const getVideo= async (req,res,next)=>{

const {mediaType}= req.params
const{link}=req.query

try {
    if(mediaType==="series" && link){


        // opening browser
        const browser= await puppeteer.launch({headless: 'new'})
        const page=await browser.newPage()
        
        await page.goto(link)
        
        // find img using alt attribute
        const imageElement=await page.$(`form >>>> img[alt="CAPTCHA Code"]`)
        

        // getting bounding box of image
        const boundBox= await page.evaluate((element)=>{
            const{x,y,width,height}=element.getBoundingClientRect()
            return {x,y,width,height}
        },imageElement)


        // taking screen shot of captcha code
       const binaryDataOfImg= await page.screenshot({
            clip:boundBox,
            encoding:"binary"
        })



            //  i will change the name of the img file with the code to a dynamic one
         await fileSys.writeFile(path.join(__dirname,"/temp-files/one.png"),binaryDataOfImg)
         let captchaText=await getTextFromImage()
        console.log(captchaText);
          
       
       await page.type(`form >>>> input[name="captchainput"]`,`${captchaText.split(" ").join("")}`)
    //    await page.click(`form >>>> input[name="submit"]`)

    //   const dd=  await page.waitForNavigation()
    //   console.log(dd)

        await browser.close()
        next()
        }
        else if(mediaType==="movie" && link){
        
        // not yet implemented
        
        }
        else{
        
        res.status(400).json({status:"Failed",message:"Bad Request"})
        
        }
} catch (error) {
    console.log(error);
    res.status(500).json({status:"Failed",message:"Sever Error"})
}



}



module.exports=getVideo