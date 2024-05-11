    let cityName="Mysore";
    let APIkey='6af6bdc540c3b760cfa832214a8b4a5b';
    let lat;
    let lon;
    async function getApi(){
    let fetched= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=15&appid=${APIkey}`);
    let data=await fetched.json();
    lat=await data[0].lat.toFixed(2)
    lon=await data[0].lon.toFixed(2)
    let weather=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`);
    let respond=await weather.json();
    const temp=respond.main.temp;
    const humid=respond.main.humidity;   
    const condition=respond.weather[0].main ;
    const icon=respond.weather[0].icon ;
    const wind=respond.wind.speed;
    console.log(respond);
    return {temp,humid,condition,wind,icon};
    
    }
async function getWeather(){
    let weatherData=await getApi();
    document.querySelector(".name").textContent=cityName;
    document.querySelector(".temp").textContent=`${weatherData.temp}°C`;
    document.querySelector(".condition").textContent=weatherData.condition;
    document.querySelector(".h").textContent=`${weatherData.humid} %`;
    document.querySelector(".w").textContent=`${weatherData.wind} m/s`;
}
document.querySelector(".adding").addEventListener("click",()=>{
    document.querySelector("form").style.display="block";
    document.querySelector(".adding").style.display="none";
})

document.querySelector(".btn").addEventListener("click",()=>{
    if(document.querySelector(".text").value!=""){
 cityName=document.querySelector(".text").value;
 document.querySelector(".adding").style.display="inline";
 document.querySelector("form").style.display="none";
 getWeather()
    }
});getWeather();