async function main(){
    //create map
    let userCoord = await getCoords()
    var map = L.map('map').setView([userCoord[0], userCoord[1]], 13)


    console.log(userCoord[0].toFixed(2))
    let myLoc = (userCoord[0].toFixed(2)).toString()+','+(userCoord[1].toFixed(2)).toString()
    console.log(myLoc)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    //Get users choice
    const myButton = document.getElementById("submitButton")
    myButton.addEventListener("click", myFunction => {
        let myChoice = document.getElementById('bussiness') 
        placeSearch(myChoice.value, myLoc)
    })

    //fetching foursquare
    // api key: fsq3LJTyMVuK+jINq6/8vW2zZI466qt0LrR2C0CwtfOOrY4=
    
    async function placeSearch(place, loc) {
        try {
            const searchParams = new URLSearchParams({
              query: place,
              ll: loc,
              open_now: 'true',
              sort: 'DISTANCE'
            });
            const results = await fetch(
              `https://api.foursquare.com/v3/places/search?${searchParams}`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  Authorization: 'fsq3LJTyMVuK+jINq6/8vW2zZI466qt0LrR2C0CwtfOOrY4=',
                }
              }
            );
            const data = await results.json();
            return data;
        } catch (err) {
            console.error(err);
        }
    }
}

//get current location
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}


main()
