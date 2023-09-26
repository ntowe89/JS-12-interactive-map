async function main(){
    //create map
    let userCoord = await getCoords()
    var map = L.map('map').setView([userCoord[0], userCoord[1]], 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    //Get users choice
    const myButton = document.getElementById("submitButton")
    myButton.addEventListener("click", myFunction => {
        let myChoice = document.getElementById('bussiness')
        console.log(myChoice.value)
    })
}

//get current location
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}


main()
