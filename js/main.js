const toggleWeather = document.getElementById("weatherbox");
const toggleAttraction = document.getElementById("attractionbox");
const toggleFilter = document.getElementById("filterbox");

const date = new Date();
const todayYYYYMMDD = date.toISOString().slice(0,10).replace(/-/g,"");

document.getElementById('go').addEventListener('click', getInputValues())

async function async_fetch(url) {
  let response = await fetch(url)
  if (response.ok) return await response.json()
  throw new Error(response.status)
}

function getInputValues(){

    var userInput = document.getElementById("searchstring").value;
    document.getElementById('Location').innerHTML = userInput + ' ' + toggleWeather.checked + ' ' + toggleAttraction.checked + ' ' + toggleFilter.checked;
    const searchString = userInput;

    const owApiKey = 'ba7d7bd4fdebe62b631228f627388e55';
    const owApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=${owApiKey}&units=metric`;
    
    const fourSquareClientId = 'T4CUMQYSVC2IDMOHDYYGVD5KJBKJTQZ5KI3UK2DPU4VQ5OYQ'
    const fourSquareClientSecret = '53HJ4WF10OAMSPFQKZKAKQIVME0BUP4WC4JLVYJPDJGRQYEV'
    const fourSquareUrl = `https://api.foursquare.com/v2/venues/explore?near=${searchString}&v=${todayYYYYMMDD}&client_id=${fourSquareClientId}&client_secret=${fourSquareClientSecret}&limit=10`
    
    if (userInput != ""){
      const weather = async_fetch(owApiUrl);
      console.log(weather);

      const places = async_fetch(fourSquareUrl);
      console.log(places);

    }
    
    /*
    const toggleWeather = document.getElementById("weatherbox");
    const toggleAttraction = document.getElementById("attractionbox");
    const toggleFilter = document.getElementById("filterbox");
    */
   
    
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