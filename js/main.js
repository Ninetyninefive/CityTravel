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
toggleFilter.onclick = sortByAlpha;

function result(index, name, address, city, iconPlaceUrl){
  this.index = index;
  this.name = name;
  this.address = address;
  this.city = city;
  this.iconPlaceUrl = iconPlaceUrl;
};

async function sortByAlpha(){
  let disable = document.querySelector('.results');
  disable.innerHTML = '';

  let results = [];
  let y = places;
      
      for (let index = 0; index < y.response.groups[0].items.length; index++) {
          let path = y.response.groups[0].items[index];

        var current = new result(
          y.response.groups[0].items[index],
          path.venue.name,
          path.venue.location.address,
          path.venue.location.city,
          path.venue.categories[0].icon.prefix + '88' + path.venue.categories[0].icon.suffix
        );
        
        results.push(current);
      };

      let sorted = sortByKey(results, 'name')

      console.log(results.sort)
      console.log(sorted);
      console.log(current);
      console.log(results);
      
      // compose DOM nodes for RESULTs
    sorted.forEach(Object => {
      target = document.querySelector('.results');
      fragment = document.createDocumentFragment();
  
      article = document.createElement('article');
          article.textContent = '';
          article.className = 'attraction';
          fragment.appendChild(article);
  
       h1 = document.createElement('h1');
          h1.textContent = `${Object.name}`;
          h1.className = 'name';
          article.appendChild(h1);
  
       p1 = document.createElement('p');
          p1.textContent = `${Object.address}`;
          p1.className = 'address';
          article.appendChild(p1);
  
       p2 = document.createElement('p');
          p2.textContent = `${Object.city}`;
          p2.className = 'city';
          article.appendChild(p2);
  
       img = document.createElement('img');
          img.src = `${Object.iconPlaceUrl}`;
          img.className = 'entry-image';
          img.crossOrigin = "anonymous";
          article.appendChild(img);
        
        target.appendChild(fragment);
      })
     
};

function disableAttractions(){
  let disable = document.querySelector('.results');
  disable.innerHTML = '';
  const disableAttractions = 'true';
}
function disableWeather(){
  let disable = document.querySelector('.weather');
  disable.innerHTML = '';
  const disableWeather = 'true';
}

function sortByKey(array, key) {
return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
});
}

async function async_fetch(url) {
  try {
    let response = await fetch(url)
    if (response.ok) return response.json()
    throw new Error(response.status)
  } catch (e) {
    someThingWentWrong();
  }
}

async function getInputValuesAndExecuteSearch(){

  let reset1 = document.querySelector('.weather');
  let reset2 = document.querySelector('.results');
  reset1.innerHTML = '';
  reset2.innerHTML = '';
  reset1.style.display="grid";
  reset2.style.display="grid";


    var userInput = document.getElementById("searchstring").value;
    let searchString = userInput;

    const owApiKey = 'ba7d7bd4fdebe62b631228f627388e55';
    let owApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=${owApiKey}&units=metric`;
    
    const fourSquareClientId = 'T4CUMQYSVC2IDMOHDYYGVD5KJBKJTQZ5KI3UK2DPU4VQ5OYQ'
    const fourSquareClientSecret = '53HJ4WF10OAMSPFQKZKAKQIVME0BUP4WC4JLVYJPDJGRQYEV'
    let fourSquareUrl = `https://api.foursquare.com/v2/venues/explore?near=${searchString}&v=${todayYYYYMMDD}&client_id=${fourSquareClientId}&client_secret=${fourSquareClientSecret}&limit=10`
    
    if (userInput != ""){
      weather = await async_fetch(owApiUrl);
      places = await async_fetch(fourSquareUrl);
    }    
    
    injectResults().then().catch(Error => {
      if(404){
        someThingWentWrong();
      }
    });
}
async function someThingWentWrong(){
   // Something went wrong ->
  let article = document.querySelector('.weather');
  // compose DOM nodes
  let fragment = document.createDocumentFragment();
  let h1 = document.createElement('h1');
    
      h1.textContent = `Something went wrong!`;
    
    fragment.appendChild(h1);

// append the fragment to the DOM tree
      article.appendChild(fragment);  
}

async function injectResults(){
  //INJECTING WEATHER INFO
  let x = weather;
  
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
      if(!toggleAttraction.checked){
        target.appendChild(fragment);
      }
      
      //INJECT PLACES INFO
      let results = [];
      let y = places;

          for (let index = 0; index < y.response.groups[0].items.length; index++) {
              let path = y.response.groups[0].items[index];
    
            var current = new result(
              y.response.groups[0].items[index],
              path.venue.name,
              path.venue.location.address,
              path.venue.location.city,
              path.venue.categories[0].icon.prefix + '88' + path.venue.categories[0].icon.suffix
            );
    
            results.push(current);
          };
          if(toggleFilter.checked){
            let sorted = sortByKey(results, 'name')
            results = sorted;
          }

      // compose DOM nodes  
      results.forEach(Object => {
        target = document.querySelector('.results');
        fragment = document.createDocumentFragment();
    
        article = document.createElement('article');
            article.textContent = '';
            article.className = 'attraction';
            fragment.appendChild(article);
    
         h1 = document.createElement('h1');
            h1.textContent = `${Object.name}`;
            h1.className = 'name';
            article.appendChild(h1);
    
         p1 = document.createElement('p');
            p1.textContent = `${Object.address}`;
            p1.className = 'address';
            article.appendChild(p1);
    
         p2 = document.createElement('p');
            p2.textContent = `${Object.city}`;
            p2.className = 'city';
            article.appendChild(p2);
    
         img = document.createElement('img');
            img.src = `${Object.iconPlaceUrl}`;
            img.className = 'entry-image';
            img.crossOrigin = "anonymous";
            article.appendChild(img);
          
            if(!toggleWeather.checked){
              target.appendChild(fragment);
            }
        })
        
        
      }