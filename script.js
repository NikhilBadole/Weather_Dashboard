const apiKey = "26ff6b659a363a60f15f10e0e9b1cf59" ;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY}&units=metric`;

async function fetchDetails(cityName){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);
    // console.log(result.weather[0].id);
    // console.log(result.main.temp_max);
    // console.log(result.sys.country);
    displayCard(result);
}

const btn = document.getElementById("search");
const input = document.getElementById("search-input");
const displayBlock = document.getElementById("display-container");
let cnt = 0;
btn.addEventListener("click", () => {
    // console.log(input.value);
    if(input.value === null){
        return;
    }

    // displayBlock.innerHTML=``;
    const cityName = input.value;
    fetchDetails(cityName)
})


const cardArray = [];
const map = new Map();
function displayCard(result){

    const temp = Math.floor(result.main.temp);
    const temp_max = Math.floor(result.main.temp_max);
    const temp_min = Math.floor(result.main.temp_min);

    const city_name = result.name;
    const countryName = result.sys.country;

    const card = document.createElement("div");
    card.className = "container";

    // const weatherConditionId = result.weather[0].id;
    const weatherDescription = result.weather[0].description;
    const weatherIcon = result.weather[0].icon;

    if(map.has(city_name) === true) return;   // return if city already present in map
    map.set(city_name, temp);


    card.innerHTML = `<div class="container">
    <img class="img9" src="Rectangle.png">
    <div class="card-top">
        <span class="temp">${temp}<sup style="font-size: 35px;">o</sup></span>
        <img class="img2" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">
    </div>
    <p class="humidity">H:${temp_max}<sup style="color: #afa2da;">o</sup> L:${temp_min}<sup style="color: #afa2da;">o</sup></p>
    <div class="bottom">
        <span class="bottom1">${city_name}, ${countryName}</span>
        <span class="bottom2">${weatherDescription}</span>
    </div>
   </div>`

   cnt++;
   cardArray.push([temp,card]);

   cardArray.sort((row1, row2) => row1[0] - row2[0]);

   for(var i=1;i<=cardArray.length; i++){
      displayBlock.appendChild(cardArray[i-1][1])
   } 
//    displayBlock.appendChild(cardArray[cardArray.length-1].card)
}