const express = require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
//root folder
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");
})

app.post("/result",(req,res)=>{
  //api calling
  const url="https://api.openweathermap.org/data/2.5/weather?q="+req.body.city+"&APPID=1646a4f525442d0ffc114e527bf69560&units=metric"
  https.get(url,(response)=>{
    response.on("data",(data)=>{
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const description=weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<h1> Your City "+req.body.city+" temperature is "+temp+" Celsius <h1>");
      res.write("<h2> Weather is currently "+description+" <h2>");
      res.write("<img src="+imgUrl+">")
      res.send();
      //console.log(temp+"  "+description);
    })
//console.log(temp);//not working?
  })
//result
//console.log(temp);//not working?
//learn how to make variables global scope
})



app.listen(3000,()=>{
  console.log("app listening 3000");
})
