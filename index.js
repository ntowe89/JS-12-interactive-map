async function main(){
    //create map
    let userCoord = await getCoords()
    var map = L.map('map').setView([userCoord[0], userCoord[1]], 13)

    let myLat = (userCoord[0].toFixed(2)).toString()
    let myLong = (userCoord[1].toFixed(2)).toString()
    console.log(myLat, myLong)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    //Get users choice
    let myChoice = null
    const myButton = document.getElementById("submitButton")
    myButton.addEventListener("click", myFunction => {
        myChoice = document.getElementById('bussiness') 
        console.log(myChoice.value)
    })

    //fetching foursquare
    // api key: fsq3LJTyMVuK+jINq6/8vW2zZI466qt0LrR2C0CwtfOOrY4=
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3LJTyMVuK+jINq6/8vW2zZI466qt0LrR2C0CwtfOOrY4='
        }
      };
      
      fetch('https://api.foursquare.com/v3/places/search?query='+myChoice+'&ll='+ myLat +'%2C'+myLong+'&radius=24140&limit=5', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

//get current location
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}


main()
