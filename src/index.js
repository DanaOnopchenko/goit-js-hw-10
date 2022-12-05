import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}


const DEBOUNCE_DELAY = 300;

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY) );

function onSearch(evt) {
    const nameCountry = evt.target.value.trim();
  clearMarkupList();
  clearMarkupCard();
    if (!nameCountry.length) { 
        // clearMarkupList();
        // clearMarkupCard();
        // alert('поле пусте');
        return;
    }
    fetchCountries(nameCountry)
        .then(countries => {
            // console.log(country)

            if (countries.length > 10) {
                Notify.info(`Too many matches found. Please enter a more specific name.`);
                return;
            }
            else if (countries.length >= 2 && countries.length <= 10) { 
                creatMarkupList(countries);
                return;
            }
            creatMarkupCard(countries)
        })
        .catch(error => { 
            Notify.failure(`Oops, there is no country with that name`);
            console.log(error)
        })
        // .finally(() => { 

        // }) 
}

function creatMarkupCard(arr) {
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
   

function creatMarkupList(arr) { 
    const markup = arr.map(({ name, flags }) => {
        return `<img src="${flags.svg}" alt="flags of ${name.official}" width= 30px/>
      <p>${name.official}</p>`
    }).join('');
    refs.countryList.insertAdjacentHTML('beforeend', markup)
}
  
function clearMarkupList() {
    refs.countryList.innerHTML = '';
}
 function clearMarkupCard() {
     refs.countryList.innerHTML = '';
}   
