import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import _ from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', _.debounce(addInput, DEBOUNCE_DELAY, {
    'leading': true,
    'trailing': false
}));

function addInput(event) {
    event.preventDefault();
    const name = event.currentTarget.value.trim();
    if (!name) {
        Notify.failure("Oops, there is no country with that name");
    } else {
        fetchCountries(name)
            .then(data => createMarkup(data))
            .catch(error => {
                console.log(error);
                Notify.failure("Oops, there is no country with that name");
            });
    }
   
}

function createMarkup(arr) {
    if (arr.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (arr.length >= 2 && arr.length <= 10) {
        const markup = arr.map(({ name, capital, languages, population, flags }) => 
        `<div>
            <img src="${flags.svg}" alt="${name.official} flag" width="30" height="20" />
            <h1 style="display:inline-block;" >${name.official}</h1>
        </div>`
        ).join('')
        
        countryInfo.innerHTML = markup;
    } else {
        const markup = arr.map(({ name, capital, languages, population, flags }) => 
                `<div>
                    <div>
                        <img src="${flags.svg}" alt="${name.official} flag" width="30" height="20" />
                        <h1 style="display:inline-block;" >${name.official}</h1>
                    </div>
                    <h2>Capital: ${capital}</h2>
                    <h2>Population: ${population}</h2>
                    <h2>Language: ${Object.values(languages)}</h2>
                </div>`
        ).join('')
        
        countryInfo.innerHTML = markup;
    }
}
