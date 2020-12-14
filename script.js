const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const name = document.getElementById("name");
const img = document.getElementById("weather-img");
function KtoF(data) {
    return ((data - 273.15) * 1.8 + 32).toFixed(2);
}
async function getWeather() {
    document.getElementById("error").innerHTML = "";
    const city = document.getElementById("input-city").value
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=556df7718a4c2100db8f426da809ea24`,
     {mode: 'cors'});
     const weatherData = await response.json();
     const description = weatherData.weather[0].description;
     temperature.innerHTML = `${KtoF(weatherData.main.temp)} Fahrenheit`;
     condition.innerHTML = description;
     name.innerHTML = weatherData.name;
     getImage(description);
}
async function getImage(condition) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=6yhtGdnNlvGuNVgLuvUx1nQNrxYHnrcZ&s=${condition}`, {mode: 'cors'});
    const imageData = await response.json();
    img.src = imageData.data.images.original.url;
    img.style.display = "block";
}
function clickWeather() {
    return getWeather().catch((error) => {
          document.getElementById("error").innerHTML = "Invalid city";
      });
    }
