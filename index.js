const express=require("express");
const axios=require("axios");
require('dotenv').config();

const app=express();

const API_KEY=process.env.API_KEY;
const port=3000;

app.get('/',function(req,res){
    const address =req.query.address;
    const url= `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;

    axios.get(url)
    .then(response=>{
        const data=response.data;
        const cityName=data.name;
        const temperature=data.main.temp;
        const humidity=data.main.humidity;
        const windSpeed=data.wind.speed;
        const sunsetTime=new Date(data.sys.sunset*1000).toLocaleTimeString();

        const message=`City Name: ${cityName}<br>Temperature:${temperature}&deg;C<br>Humidity:${humidity}<br>Wind Speed:${windSpeed}<br>Sunset Time:${sunsetTime}`;

        res.send(`<html><body><div id="container" class="d-flex flex-row justity-content-center"><h1>${message}</h1></div></body></html>`);
    })
    .catch(error=>{
        console.error(error);
        res.status(500).send("Error occured while fetching the weather data");
    });
});

app.listen(port,()=>{
    console.log(`Server Running on port ${port}`)
})