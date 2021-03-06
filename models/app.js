document.getElementById('sBtn').addEventListener('click', buttonClick);

function buttonClick() {
  getWeatherApi();
  getTimeApi();
  getPhotoAPi();
  toggle();
}

function getWeatherApi() {
  var text = document.getElementById('textField').value;
  var cityName = text;
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=998622209b482ba9e65147a32c1f0f98';

  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      let object = {
        description: data["weather"][0]["description"],

        humidity: data["main"]["humidity"],
        windSpeed: data["wind"]["speed"],
        tempOutput: Math.round(data["main"]["temp"] - 273.15) + "°C",
        nameOutput: data["name"],
        icon: data["weather"][0]["icon"],
      }


      let logo = `<img id="logo" src='http://openweathermap.org/img/w/${object.icon}.png'>`
      document.getElementById('logo').innerHTML = logo;
      document.getElementById('output').innerHTML = object.description;
      document.getElementById('tempOut').innerHTML = object.tempOutput;
      document.getElementById('humidityLabel').innerHTML = 'Humidity: ' + object.humidity + '%';
      document.getElementById('windLabel').innerHTML = 'Wind: ' + object.windSpeed + ' Km/h';
      document.getElementById("nameLabel").innerHTML = object.nameOutput;
    })
}

function getTimeApi() {
  var txt = document.getElementById('zoneSelector').value;
  var text = document.getElementById('textField').value;
  var url = 'http://api.timezonedb.com/v2.1/get-time-zone?key=CM90AHOMNZMZ&format=json&by=zone&zone=' + txt + '/' + text;
  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var str = data["formatted"];
      var splitedStr = str.split(' ');
      var sliced = splitedStr[1].slice(0, -3);
      document.getElementById("timeLabel").innerHTML = sliced;
    })
}

function getPhotoAPi() {
  var text = document.getElementById('textField').value;
  var url = 'https://api.pexels.com/v1/search?query=' + text;
  fetch(url, {
    headers: {
      "Authorization": "563492ad6f91700001000001ceb06ebc37bd42538d777ea4c8f5f745"
    }
  }).then(function(res) {
    return res.json();
  }).then(function(data) {
    let output = `<img id="photo" src=${data["photos"][0]["src"]["original"]}>`;
    document.getElementById("photo").innerHTML = output;
  })
}

function toggle() {
  document.querySelector('.display').classList.toggle('display');
}
