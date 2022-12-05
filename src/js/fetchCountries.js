
export {fetchCountries};

 
const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER = `name,capital,population,flags,languages`;   


function fetchCountries(name) { 
    return fetch(`${BASE_URL}/name/${name}?fields=${FILTER}`)
        .then(resp => {
            // console.log(resp);
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json()
        })
        // .then(data => {
        //     return data
        // })
        .catch(err => { 
            console.error(err)
        }
            );
}