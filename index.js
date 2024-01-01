const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");

const userContainer=document.querySelector(".weather-container");
const grantAccessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");

const API_KEY="b9606b3e8bc229a50d5825bf86b3802e";
let oldTab=userTab;
oldTab.classList.add("current-tab");//to add css property 
//to switch the tab
getfromSessionStorage();
function switchTab(newTab){
    if(newTab!=oldTab){
        oldTab.classList.remove("current-tab");
        oldTab=newTab;
        oldTab.classList.add("current-tab");
           //mala search tab open krnyasathi other 2 tab band (deactive )krave lagtil
           //1.your weather
           //2.grant access container
           if(!searchForm.classList.contains("active")){
                userInfoContainer.classList.remove("active");
                grantAccessContainer.classList.remove("active");
                searchForm.classList.add("active");
           }
           else{
            //jar addhipasun searchfrom tab mdhe ahe
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //now apan your weather container vr alo ahe 
            //tyache coordinate ithe store honar
            getfromSessionStorage();
           }
    }
}
userTab.addEventListener("click",()=>
{//pass click tab as input parameter
    switchTab(userTab);
}
);
searchTab.addEventListener("click",()=>{
    //jya tab vr click kela ahe to pass kara
    switchTab(searchTab);
});
//coardinatees present ahet ki nhi
function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        //jar local cordinate nhi bhetele
        grantAccessContainer.classList.add("active");
    }else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    try{
        const response=await fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const data=await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");

    }
}

function renderWeatherInfo(weatherInfo){
    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    cityName.innerText=weatherInfo?.name;
countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
desc.innerText=weatherInfo?.weather?.[0]?.description;
weatherIcon.src=`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
// temp.innerText=`${weatherInfo?.main?.temp} K`;
temp.innerText = `${(weatherInfo?.main?.temp - 273.15).toFixed(2)} °C`;

// °C
windspeed.innerText=`${weatherInfo?.wind?.speed} m/s`;
humidity.innerText=`${weatherInfo?.main?.humidity}%`;
cloudiness.innerText=`${weatherInfo?.clouds?.all}%`;

}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{

    }
}
function showPosition(position){
    const userCoordinates={
        lat:position.coords.latitude,

        lon:position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}


const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);

const searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;
    if(cityName==="")return;
    else
    fetchSearchWeatherInfo(cityName);
});
async function fetchSearchWeatherInfo(city){
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccessContainer.classList.remove("active");
  try{
    const response=await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data=await response.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
  }
  catch(err){
         console.log(alert);
  }
}