import './css/styles.css';

const DEBOUNCE_DELAY = 300;


// fetch('https://restcountries.com/v3.1/name/Ukraine?fields=name,capital,population,flags,languages')
//     .then(response => { 
//         return response.json();
//     }).
//     then(country => { 
//         console.log(country)
//     })
//     .catch(error => { 
//         console.log(error);
//     })

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER = `name,capital,population,flags,languages`;

refs.searchInput.addEventListener('input', onSearch);

function onSearch(evt) {
    const nameCountry = evt.target.value;
    if (!nameCountry) { 
        alert('поле пусте');
        return
    }
    fetchCountries(nameCountry).then(country =>
        
        creatMarkup(country))
    
}

function creatMarkup(arr) {
    const markup = arr.map(({ name, flags, capital, population, languages}) => {
        return `<img src="${flags.svg}" alt="flags of ${name.official}" width= 30px/>
      <h1>${name.official}</h1>
      <ul>
        <li>Capital: ${capital}</li>
        <li>Population: ${population}</li>
        <li>Languages: ${Object.values(languages).join(', ')}</li>
      </ul>`
    }).join('');
    refs.countryInfo.insertAdjacentHTML('beforeend', markup)
}
   
    



function fetchCountries(name) { 
    return fetch(`${BASE_URL}/name/${name}?fields=${FILTER}`)
        .then(resp => {
            console.log(resp);
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        }).then(data => {
            return data
        })
      .catch(err => console.error(err))
}
