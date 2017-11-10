const API_KEY = 'AIzaSyCdVvCaJ1ZITnWuo3IAMqvaRXyBZzdfDlE'
const url = "https://maps.googleapis.com/maps/api/geocode/json?"
const query = `components=country:US|administrative_area:TX|locality:Austin&key=${API_KEY}&address=`

const backend_url = 'https://amneserver.herokuapp.com/places'

export function resourse(url) {
    return fetch(url)
    .then(response => {
        if (response.status == 401) {
            throw new Error("Error occurs when fetch data")
        }else {
            return (response.headers.get('Content-Type').indexOf('json') > 0) ? response.json() : response.text()
        }
    })
}
/* 
    Using google geocode service to get the lat and lng of searching place,
    At the same time, check if the searched place is in Austin
*/
export function getGeoPoint(places) {
    
    const addr_one = places.addr_one.split(' ').join('+')
    const addr_two = places.addr_two.split(' ').join('+')
    const prom_one = resourse(url + query + addr_one)
    const prom_two = resourse(url + query + addr_two)
    let locations = []
    
    return Promise.all([prom_one, prom_two])
    .then(res => {
        res.map(r => {
            if (r.status == 'OK' && r.results.length > 0 && 
                r.results[0].address_components[0].long_name != 'Austin'){
                let location = r.results[0].geometry.location
                locations.push(location)
            }else {
                throw new Error("Error: You have input a place that is not in Austin")
            }
        })
        return locations
    })    
}
/*
    Since Google place api only support fetch operation in node server environment,
    I built a little server whose function is to fetch nearBy real estate of giving lat and lng
    And push it to heroku

    This funcion is to fetch data from the backend, and get all the information of real estate
    Using the backend url
*/
export function getNearbyEstate(locations) {
    let promises = locations.map(location => {
        const newQuery = `?lat=${location.lat}&lng=${location.lng}`
        return resourse(backend_url + newQuery)
    })
    return Promise.all(promises)
    .then(r => {
        let estates = []
        let estate_names = []
        r.map(e => {
            if (e.status === 'OK' && e.results.length > 0){
                e.results.forEach(el => {
                    let curData = {location: el.geometry.location, name: el.name}
                    if (estate_names.indexOf(el.name) === -1){
                        estate_names.push(el.name)
                        estates.push(curData)
                    }
                })
            }else {
                throw new Error("Error when fetch the data of nearby estates")
            }
        })
        return estates
    })
}
/*
    Calculate the sum of two distances between a real state and search location
    Using google distance service
*/
export function getSumDistance(estate, locations){
    const service = new google.maps.DistanceMatrixService()
    const loc_1 = new google.maps.LatLng(locations[0].lat, locations[0].lng)
    const loc_2 = new google.maps.LatLng(locations[1].lat, locations[1].lng)
    const e_addr = new google.maps.LatLng(estate.location.lat, estate.location.lng)
    
    let sumDistance = 0
    return new Promise((resolve, reject) => {
        service.getDistanceMatrix({
            origins: [loc_1, loc_2],
            destinations: [e_addr],
            travelMode: 'DRIVING'
        }, (res, status) => {
            if (status === 'OK') {
                const origins = res.originAddresses
                for (let i = 0; i < origins.length; i++){
                    let results = res.rows[i].elements
                    sumDistance += results[0].distance.value
                }
                resolve({...estate, distance: sumDistance})
            }else {
                reject(new Error("Error when sum all distance."))
            }
        })
    })
}
