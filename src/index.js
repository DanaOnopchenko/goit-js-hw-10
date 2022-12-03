import './css/styles.css';

const DEBOUNCE_DELAY = 300;


fetch('https://restcountries.com/v3.1/name/Ukraine?fields=name,capital,population,flags,languages')
    .then(response => { 
        return response.json();
    }).
    then(country => { 
        console.log(country)
    })
    .catch(error => { 
        console.log(error);
    })
