const owAPIkey = 'ba7d7bd4fdebe62b631228f627388e55';
const owAPIurl = `https://api.openweathermap.org/data/2.5/weather?q=${searchstring}&appid=${owAPIkey}`;
const searchstring = inputVal;

const toggleWeather = document.getElementById("weatherbox");
const toggleAttraction = document.getElementById("attractionbox");
const toggleFilter = document.getElementById("filterbox");

document.getElementById('go').addEventListener('click', getInputValues())


function getInputValues(){
    var inputVal = document.getElementById("searchstring").value;
    document.getElementById('Location').innerHTML = inputVal + ' ' + toggleWeather.checked + ' ' + toggleAttraction.checked + ' ' + toggleFilter.checked;

    /*
    const toggleWeather = document.getElementById("weatherbox");
    const toggleAttraction = document.getElementById("attractionbox");
    const toggleFilter = document.getElementById("filterbox");
    */
   
    async_fetch(owAPIurl)
}

async function async_fetch(url) {
    let response = await fetch(url)
    if (response.ok) return await response.json()
    throw new Error(response.status)
  }

/*
https://api.foursquare.com/v2/venues/explore?ll=40.7,-74&v=20121124
GET https://api.foursquare.com/v2/venues/explore
&client_id=XXXX&client_secret=XXXX
&near 	Chicago, IL 	required unless ll is provided
&section 	food || topPicks
&limit 	10
sortByPopularity 	1
=<dagensdatum>,


ex:http://api.foursquare.com/v2/venues/explore?.....&v=20210114.
****

https://api.openweathermap.org/data/2.5/weather

api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

q
APPID
units=metric
*/