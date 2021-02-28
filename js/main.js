let toggleWeather = document.getElementById("weatherbox");
let toggleAttraction = document.getElementById("attractionbox");
let toggleFilter = document.getElementById("filterbox");
let weather, places;

var dateObj = new Date()
var weekday = dateObj.toLocaleString("default", { weekday: "long" })

const todayYYYYMMDD = dateObj.toISOString().slice(0,10).replace(/-/g,"");
const btn = document.querySelector('button');
btn.onclick = getInputValuesAndExecuteSearch;

async function async_fetch(url) {
  let response = await fetch(url)
  if (response.ok) return await response.json()
  throw new Error(response.status)
}

function getInputValuesAndExecuteSearch(){

    var userInput = document.getElementById("searchstring").value;
    let searchString = userInput;

    const owApiKey = 'ba7d7bd4fdebe62b631228f627388e55';
    let owApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=${owApiKey}&units=metric`;
    
    const fourSquareClientId = 'T4CUMQYSVC2IDMOHDYYGVD5KJBKJTQZ5KI3UK2DPU4VQ5OYQ'
    const fourSquareClientSecret = '53HJ4WF10OAMSPFQKZKAKQIVME0BUP4WC4JLVYJPDJGRQYEV'
    let fourSquareUrl = `https://api.foursquare.com/v2/venues/explore?near=${searchString}&v=${todayYYYYMMDD}&client_id=${fourSquareClientId}&client_secret=${fourSquareClientSecret}&limit=10`
    
    if (userInput != ""){
      weather = async_fetch(owApiUrl);
      places = async_fetch(fourSquareUrl);
    }    
    /*
    const toggleWeather = document.getElementById("weatherbox");
    const toggleAttraction = document.getElementById("attractionbox");
    const toggleFilter = document.getElementById("filterbox");
    */

    console.log(weather);
    console.log(places);
    
    generateResults()
}

async function generateResults(){
  if(toggleWeather){
    showWeather();
  } else if(toggleAttraction){
    showPlaces();
  } else if(toggleFilter){
    showPlacesFiltered();
  } else{
    showWeather();
    showPlaces();
  }
  
}
async function showWeather(){
  let x = await weather;
  
  let day = weekday;
  let temp = x.main.temp;
  let ftemp = x.main.feels_like;
  let desc = x.weather[0].description;
  let icon = x.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
  
  let article = document.querySelector('.weather');
  
// compose DOM nodes
let fragment = document.createDocumentFragment();
let h1 = document.createElement('h1');
    h1.textContent = `${day}`;
    h1.className = 'weekday';
let p1 = document.createElement('p');
    p1.textContent = `Temp: ${temp} °C`;
    p1.className = 'temp';
let p2 = document.createElement('p');
    p2.textContent = `Condition: ${desc}`;
    p2.className = 'condition';
let img = document.createElement('img');
    img.src = `${iconUrl}`;
    img.className = 'entry-image';
    img.crossOrigin = "anonymous";

    fragment.appendChild(h1);
    fragment.appendChild(p1);
    fragment.appendChild(p2);
    fragment.appendChild(img);

// append the fragment to the DOM tree
  
  article.appendChild(fragment);
}

async function showPlaces(){
  let y = await places;
  //////PLACES
  let name = y.response.groups[0].items[0].venue.name;
  let address = y.response.groups[0].items[0].venue.location.address;
  let city = y.response.groups[0].items[0].venue.location.city;
  let icon = y.response.groups[0].items[0].venue.categories[0].icon.prefix + y.response.groups[0].items[0].venue.categories[0].icon.suffix;
  let iconUrl = `${icon}`;
  
  let div = document.querySelector('.results');
  
// compose DOM nodes
let fragment2 = document.createDocumentFragment();
let article = document.createElement('article')
    article.className = 'attraction';
let h1 = document.createElement('h1');
    h1.textContent = `${name}`;
    h1.className = 'name';
let p1 = document.createElement('p');
    p1.textContent = `${address}`;
    p1.className = 'address';
let p2 = document.createElement('p');
    p2.textContent = `${city}`;
    p2.className = 'city';
let img = document.createElement('img');
    img.src = `${iconUrl}`;
    img.className = 'entry-image';
    img.crossOrigin = "anonymous";
    
    fragment2.appendChild(article);
    fragment2.appendChild(h1);
    fragment2.appendChild(p1);
    fragment2.appendChild(p2);
    fragment2.appendChild(img);

// append the fragment to the DOM tree
  
  div.appendChild(fragment);
  
}
function showResultsBasedOnFilters(){
  
}



/*
https://api.foursquare.com/v2/venues/explore?ll=40.7,-74&v=20121124
GET https://api.foursquare.com/v2/venues/explore
&client_id=XXXX&client_secret=XXXX
&near 	Chicago, IL 	required unless ll is provided
&section 	food || topPicks
&limit 	10
sortByPopularity 	1
v=<dagensdatum>,


ex:http://api.foursquare.com/v2/venues/explore?.....&v=20210114.
****

https://api.openweathermap.org/data/2.5/weather

api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

q
APPID
units=metric
*/