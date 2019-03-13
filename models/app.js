document.getElementById('sBtn').addEventListener('click', buttonClick);

function buttonClick(){
    getWeatherApi();
    getTimeApi();
    getPhotoAPi();
}

function getWeatherApi(){
    var text = document.getElementById('textField').value;
    var cityName = text;
//    var cityZip = text;
//    if (isNaN(text)){
      var url = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityName +'&appid=998622209b482ba9e65147a32c1f0f98';
//    }else {
//        var url = 'https://api.openweathermap.org/data/2.5/weather?zip='+ cityZip +'&appid=998622209b482ba9e65147a32c1f0f98';
//    }

    fetch(url)
        .then(function(res){
        return res.json();
    })
        .then(function(data){
        let description = data["weather"][0]["description"];
        let temp = data["main"]["temp"];
        let humidity = data["main"]["humidity"];
        let windSpeed = data["wind"]["speed"];
        let tempOutput = Math.round(temp - 273.15) + " C";
        let nameOutput = data["name"];
        document.getElementById('output').innerHTML = description;
        document.getElementById('tempOut').innerHTML = tempOutput;
        document.getElementById('humidityLabel').innerHTML = humidity;
        document.getElementById('windLabel').innerHTML = windSpeed;
        document.getElementById("nameLabel").innerHTML = nameOutput;
    })
}

function getTimeApi(){
    // var txt = document.getElementById('zoneSelector').value;
    var text = document.getElementById('textField').value;
    var url = 'http://api.timezonedb.com/v2.1/get-time-zone?key=CM90AHOMNZMZ&format=json&by=zone&zone=Asia'+ '/' + text;
    console.log(url);
    fetch(url)
        .then(function(res){
        return res.json();
//        console.log(res);
    })
        .then(function(data){
        var str = data["formatted"];
        var splitedStr = str.split(' ');
        var sliced = splitedStr[1].slice(0, -3);
        document.getElementById("timeLabel").innerHTML = sliced;
    })
}

function getPhotoAPi(){
    var text = document.getElementById('textField').value;
    var url = 'https://api.pexels.com/v1/search?query='+text;
    fetch(url, {
        headers: {
            "Authorization" : "563492ad6f91700001000001ceb06ebc37bd42538d777ea4c8f5f745"
        }
    }).then(function(res){
        return res.json();
    }).then(function(data){
        let output = `<img src=${data["photos"][0]["src"]["original"]}>`;
//        console.log("fetch success");
//        console.log(data["photos"][0]["url"]);
     document.getElementById("photo").innerHTML = output;
//        console.log(output);
    })
}
