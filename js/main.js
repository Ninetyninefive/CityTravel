const toggleWeather = document.getElementById("weatherbox");
const toggleAttraction = document.getElementById("attractionbox");
const toggleFilter = document.getElementById("filterbox");
let weather, places;

var dateObj = new Date()
var weekday = dateObj.toLocaleString("default", { weekday: "long" })
const todayYYYYMMDD = dateObj.toISOString().slice(0,10).replace(/-/g,"");

const btn = document.querySelector('button');
btn.onclick = getInputValuesAndExecuteSearch;

toggleWeather.onclick = disableAttractions;
toggleAttraction.onclick = disableWeather;

function disableAttractions(){
  let disable = document.querySelector('.results');
  disable.innerHTML = '';
}
function disableWeather(){
  let disable = document.querySelector('.weather');
  disable.innerHTML = '';
}


async function async_fetch(url) {
  let response = await fetch(url)
  if (response.ok) return await response.json()
  throw new Error(response.status)
}

function getInputValuesAndExecuteSearch(){

  let reset1 = document.querySelector('.weather');
  let reset2 = document.querySelector('.results');
  reset1.innerHTML = '';
  reset2.innerHTML = '';


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
    
    injectResults().then(console.log('success'));
}
async function someThingWentWrong(){
   // Something went wrong ->
  let article = document.querySelector('.weather');
  // compose DOM nodes
  let fragment = document.createDocumentFragment();
  let h1 = document.createElement('h1');
    h1.textContent = `Something went wrong!`;
    h1.className = 'weekday';

    fragment.appendChild(h1);

// append the fragment to the DOM tree
      article.appendChild(fragment);  
}

async function injectResults(){
  //INJECTING WEATHER INFO
  let x = await weather;
  
  let day = weekday;
  let temp = x.main.temp;
  let ftemp = x.main.feels_like;
  let desc = x.weather[0].description;
  let iconWeather = x.weather[0].icon;
  let iconWeatherUrl = `http://openweathermap.org/img/wn/${iconWeather}@2x.png`
  
  let target = document.querySelector('.weather');
  
// compose DOM nodes
let fragment = document.createDocumentFragment();

let h2 = document.createElement('h2');
    h2.className = 'Location';
    h2.textContent = `${document.getElementById("searchstring").value}`;
    fragment.appendChild(h2);

let h1 = document.createElement('h1');
    h1.textContent = `${day}`;
    h1.className = 'weekday';
    fragment.appendChild(h1);

let p1 = document.createElement('p');
    p1.textContent = `Temp: ${temp} °C`;
    p1.className = 'temp';
    fragment.appendChild(p1);

let p2 = document.createElement('p');
    p2.textContent = `Condition: ${desc}`;
    p2.className = 'condition';
    fragment.appendChild(p2);

let img = document.createElement('img');
    img.src = `${iconWeatherUrl}`;
    img.className = 'entry-image';
    img.crossOrigin = "anonymous";
    fragment.appendChild(img);

    // append the fragment to the DOM tree
    
    target.appendChild(fragment);


      //INJECT PLACES INFO
      let y = await places;
      
      for (let index = 0; index < y.response.groups[0].items.length; index++) {
          let path = y.response.groups[0].items[index];
        
        let name = path.venue.name;
        let address = path.venue.location.address;
        let city = path.venue.location.city;
        
        let iconPre = path.venue.categories[0].icon.prefix;
        let iconSize = '88';
        let iconSuff = path.venue.categories[0].icon.suffix;
        let iconPlaceUrl = `${iconPre}${iconSize}${iconSuff}`;
  
      // compose DOM nodes
  
      target = document.querySelector('.results');
      fragment = document.createDocumentFragment();
  
      article = document.createElement('article');
          article.textContent = '';
          article.className = 'attraction';
          fragment.appendChild(article);
  
       h1 = document.createElement('h1');
          h1.textContent = `${name}`;
          h1.className = 'name';
          article.appendChild(h1);
  
       p1 = document.createElement('p');
          p1.textContent = `${address}`;
          p1.className = 'address';
          article.appendChild(p1);
  
       p2 = document.createElement('p');
          p2.textContent = `${city}`;
          p2.className = 'city';
          article.appendChild(p2);
  
       img = document.createElement('img');
          img.src = `${iconPlaceUrl}`;
          img.className = 'entry-image';
          img.crossOrigin = "anonymous";
          article.appendChild(img);

          target.appendChild(fragment);
      }

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