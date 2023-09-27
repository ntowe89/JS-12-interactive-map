async function main(){
    //create map
    let userCoord = await getCoords()
    var map = L.map('map').setView([userCoord[0], userCoord[1]], 13)


    
    let myLat = (userCoord[0].toFixed(2)).toString()
    let myLong = (userCoord[1].toFixed(2)).toString()
    

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    //get user choice
    const myButton = document.getElementById("submitButton")
    myButton.addEventListener("click", myFunction => {
        let myChoice = document.getElementById('bussiness') 
        console.log(myChoice.value)
        //return getStores(myChoice.value, myLat, myLong)
    })



    //fetching foursquare
    // api key: fsq3LJTyMVuK+jINq6/8vW2zZI466qt0LrR2C0CwtfOOrY4=
    
    // tried to do a function for the fetch but couldn't get it to work
    
    // function getStores(choice, lat, long){
    //   const options = {
    //     method: 'GET',
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: 'fsq3LJTyMVuK+jINq6/8vW2zZI466qt0LrR2C0CwtfOOrY4='
    //     }
    //   };
    //   console.log(choice, lat, long)
    //   fetch('https://api.foursquare.com/v3/places/search?query='+choice+'&ll='+lat+'%2C'+long+'&radius=24140&limit=5', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    // }

    //fetching from the api
    //coffee
    const coffee = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3LJTyMVuK+jINq6/8vW2zZI466qt0LrR2C0CwtfOOrY4='
      }
    };
    
    const coffeeResponse = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=35.71%2C-82.71&radius=24140&limit=5', coffee)
      .then(coffeeResponse => coffeeResponse.json())
      //.then(coffeeResponse => console.log(coffeeResponse))
      .catch(err => console.error(err));

    //restaurant
    const restaurant = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3LJTyMVuK+jINq6/8vW2zZI466qt0LrR2C0CwtfOOrY4='
      }
    };
    
    const restaurantResponse = await fetch('https://api.foursquare.com/v3/places/search?query=food&ll=35.71%2C-82.71&radius=24140&limit=5', restaurant)
      .then(restaurantResponse => restaurantResponse.json())
      //.then(restaurantResponse => console.log(restaurantResponse))
      .catch(err => console.error(err));

    //hotel
    const hotel = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3LJTyMVuK+jINq6/8vW2zZI466qt0LrR2C0CwtfOOrY4='
      }
    };
    
    const hotelResponse = await fetch('https://api.foursquare.com/v3/places/search?query=hotel&ll=35.71%2C-82.71&radius=24140&limit=5', hotel)
      .then(hotelResponse => hotelResponse.json())
      //.then(hotelResponse => console.log(hotelResponse))
      .catch(err => console.error(err));

    //market
    const market = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3LJTyMVuK+jINq6/8vW2zZI466qt0LrR2C0CwtfOOrY4='
      }
    };
    
    const marketResponse = await fetch('https://api.foursquare.com/v3/places/search?query=market&ll=35.71%2C-82.71&radius=24140&limit=5', market)
      .then(marketResponse => marketResponse.json())
      //.then(response => console.log(response))
      .catch(err => console.error(err));
    

      //adding markers
      let newArray = marketResponse.results
      const marker = L.marker([newArray[0].geocodes.main.latitude, newArray[0].geocodes.main.longitude ])
      marker.addTo(map)
    
      const markerTwo = L.marker([newArray[1].geocodes.main.latitude, newArray[1].geocodes.main.longitude ])
      markerTwo.addTo(map)

      const markerThree = L.marker([newArray[2].geocodes.main.latitude, newArray[2].geocodes.main.longitude ])
      markerThree.addTo(map)

      const markerFour = L.marker([newArray[3].geocodes.main.latitude, newArray[3].geocodes.main.longitude ])
      markerFour.addTo(map)

      const markerFive = L.marker([newArray[4].geocodes.main.latitude, newArray[4].geocodes.main.longitude ])
      markerFive.addTo(map)
}

//get current location
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}



   
main()
