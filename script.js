
// const userTab=document.querySelector("[data-userWeather]");
// const searchTab=document.querySelector("[data-searchWeather]");
// const userContainer=document.querySelector(".weather-container");

// const grantAccesscontainer=document.querySelector(".grant-location-container");
// const searchForm=document.querySelector("[data-searchForm]");
// const loadingScreen=document.querySelector(".loading-container");
// const userInfocontainer=document.querySelector(".user-info-container");
// //intially require variable
// // const API_key="b9606b3e8bc229a50d5825bf86b3802e";
// let currentTab=userTab;
// currentTab.classList.add("current-tab");
// //
// getfromSessionstorage();

// function switchTab(clickedTab){
//   if(clickedTab!=currentTab)
//   {
//     currentTab.classList.remove("current-tab");
//     currentTab=clickedTab;
//     currentTab.classList.add("current-tab");
//     //jo class open ahe tyat active class open ahe

//     if(!searchForm.classList.contains("active")){
//       //jar search form wala tab invisible ahe tr tyala visible kela
//      userInfocontainer.classList.remove("active");
//       grantAccesscontainer.classList.remove("active");
//       searchForm.classList.add("active");
//     }
//     else{
//       //search tab vr astana your weatheer tab open kranyasasthi
//       searchForm.classList.remove("active");
//      userInfocontainer.classList.remove("active");
//       //wheather tab mdhe alo ahe ata your whaeter sathi loacal cordinate store krave lagnar
//       getfromSessionstorage();
//     }
//   }
// }
// userTab.addEventListener("click",()=>{
//   //pass click as input parameter
//   switchTab(userTab);
// });
// searchTab.addEventListener("click",()=>{
//   //pass click as input parameter
//   switchTab(searchTab);
// });
// //to check coardinate ahe ki nhi
// function getfromSessionstorage(){
//   const localCordinate=sessionStorage.getItem("user-coordinates");
// if(!localCordinate){
//   //local cordinate nhi bheetale tar
//   grantAccesscontainer.classList.add("active");
//   //make loader visible
//   loadingScreen.classList.add("active");

  
// }else{
//   const coordinates=JSON.parse(localCordinate);
//   fetchuserweatherInfo(coordinates);
  
// }
// }
// async function fetchuserweatherInfo(coordinates){
//   const {lat, lon}= coordinates;
//   //grant container invisible
//   grantAccesscontainer.classList.remove("active");
//   //laoder visible
//   loadingScreen.classList.add("active");
// try{
//   const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=b9606b3e8bc229a50d5825bf86b3802e`);
//  const data=await res.json();
//  loadingScreen.classList.remove('active');
//  userInfocontainer.classList.add("active");
//  renderWeatheInfo(data);
// }
// catch(err){
//   loadingScreen.classList.remove("active");

// }

// }
// function renderWeatheInfo(weatherInfo){
// //firstly element fetch krave lagnar
// const cityName=document.querySelector("[data-cityName]");
// const countryIcon=document.querySelector("[data-countryIcon]");
// const desc=document.querySelector("[data-weatherDesc]");
// const weatherIcon=document.querySelector("[data-weatherIcon]");
// const temp=document.querySelector("[data-temp]");
// const windspeed=document.querySelector("[data-windspeed]");
// const humidity=document.querySelector("[data-humidity]");
// const cloudiness=document.querySelector("[data-cloud]");
// //fetch value from weather info objects ans put it ui element
// cityName.innerText=weatherInfo?.name;
// countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
// desc.innerText=weatherInfo?.weather?.[0]?.description;
// weatherIcon.src=`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
// temp.innerText=weatherInfo?.main?.temp;
// windspeed.innerText=weatherInfo?.wind?.speed;
// humidity.innerText=weatherInfo?.main?.humidity;
// cloudiness.innerText=weatherInfo?.clouds?.all;

// }
// //grant access vr click kelyavr loacaal cordinate ale pahije and te session storage mdhe store kele pahije
// function getLocation(){
//   if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(showPosition);
//   }
//   else {
//     //     // x.innerHTML = "Geolocation is not supported by this browser.";
//        // console.log("no geolocation");
//     //   }
//   }
// }
// function showPosition(position){
//   const userCoordinates={
//   lat:position.coords.latitude,
//     lon:position.coords.longitude,

//   }
//   sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
//   fetchuserweatherInfo(userCoordinates);
// }
// const grantAccessButton=document.querySelector("[data-grantAccess]");
// grantAccessButton.addEventListener("click",getLocation);
// const searchInput=document.querySelector("[data-searchInput]");
// searchForm.addEventListener("submit",(e)=>{
//   e.preventDefault();
//   let cityName=searchInput.value;
//   if(cityName=="")return;
//   else
//   fetchsearchweatherInfo(cityName);
// })
// async function fetchsearchweatherInfo(city){
//   loadingScreen.classList.add("active");
//   userInfocontainer.classList.remove("active");
//   grantAccesscontainer.classList.remove("active");
//   try{
//     const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q={city}&appid=b9606b3e8bc229a50d5825bf86b3802e`);
//     const data=await response.json();
//     loadingScreen.classList.remove("active");
//     userInfocontainer.classList.add("active");
//     renderWeatheInfo(data);
//   }catch(err){

//   }
// }
