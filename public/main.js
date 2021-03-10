// Foursquare API Info
const clientId = config.clientId;
const clientSecret = config.clientSecret;
const url = config.url;

// OpenWeather Info
const openWeatherKey = config.openWeatherKey;
const weatherUrl = config.weatherUrl;  //?q={cityname}&appid={api key}

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = document.getElementById("city").value; 
  var today = new Date();
 
 var date = today.getFullYear()+''+("0" + (today.getMonth() + 1)).slice(-2)+("0" + (today.getDate() + 1)).slice(-2);
  const urlToFetch = url + city + '&limit=10&client_id='+clientId + '&client_secret='+clientSecret+'&v='+date; 
  console.clear();
  //-------------
  try{
    const response = await fetch(urlToFetch);
    if(response.ok)
    {
    const jsonResponse = await response.json();
    const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
    console.log(venues);
    return venues;

    }
  }catch(error){console.log(error)}
}


const getForecast = async () => {
 
  const urlToFetch = weatherUrl + document.getElementById("city").value + '&appid=' + openWeatherKey; 
  //-------------
  try{
    const response = await fetch(urlToFetch);
    if(response.ok)
    {
    const jsonResponse = await response.json();
    return jsonResponse;
     }
  }catch(error){console.log(error)}
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
const venue = venues[index];
const venueIcon = venue.categories[0].icon;
const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;

    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);;
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues))
  getForecast().then(forecast => renderForecast(forecast))
  return false;
}

$submit.click(executeSearch)