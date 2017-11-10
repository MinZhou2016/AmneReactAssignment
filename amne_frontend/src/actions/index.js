import { getGeoPoint, getNearbyEstate , getSumDistance} from './services'

export const SHOW_ERROR = 'SHOW_ERROR'
export const FETCH_ESTATES = 'FETCH_ESTATES'
export const FETCH_LOCATION = 'FETCH_LOCATION'

export function showError(err) {
    return {
        type: SHOW_ERROR,
        payload: err
    }
}
/* 
    Sort the estates array based on each elements' sum distance to locations[0] and locations[1]
    locations: two input address
    estates: All unordered real estates fetched from Google places
 */
export function sortDistance(estates, locations) {
    
    return (dispatch) => {
        if (estates.length <= 0 || locations.length != 2){
            dispatch(showError("Error when fetch data"))
        }else {
            let sorted_distance = []
            Promise.all(
                estates.map(e => {
                    return getSumDistance(e, locations)
                })
            ).then(r => {
                r.sort((a, b) => {
                    if (a.distance > b.distance){
                        return 1
                    }else{
                        return -1
                    }
                })
                dispatch({type: FETCH_ESTATES, payload: r})
            })
            .catch(err => {
                dispatch(showError("Error when sort distances"))
            })
        }
    }
}
/*
    Based on two address user input, Do such things:
    First: Use Google Map API to make sure the address can be found in Austin
    Second: if true, get its correspoding geometry point.
    Third: Based on the geometry point, use Google Places API, Get real estate within 10 miles of either point
    Fourth: Use Google Map distance library, get every estate's sum distance to two addresses
    Last: Sort the distance, show it on web page
*/
export function fetchAddress(places){
    return (dispatch) => {
        if (!places.addr_one || !places.addr_two) {
            dispatch(showError("Missing places"))
        }else {
            getGeoPoint(places)
            .then((points) => {
                getNearbyEstate(points)
                .then((estates) => {
                    dispatch(sortDistance(estates, points))
                    dispatch({type: FETCH_LOCATION, payload: points})
                })
            })
            .catch(err => {
                dispatch(showError(err.message))
            })
        }
    }
}


