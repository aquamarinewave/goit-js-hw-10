
// cfaafa33964cbb92c06019d4a181100b27

// https://restcountries.com/v3.1/name/Japan?key=cfaafa33964cbb92c06019d4a181100b27&fullText=true

const fetchCountries = (name) => {
    const API_KEY = 'cfaafa33964cbb92c06019d4a181100b27'; 
    const BASE_URL = 'https://restcountries.com/v3.1/name/'
    
    return fetch(`${BASE_URL}${name}?key=${API_KEY}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }

        return resp.json();
    }) 
}

export default fetchCountries;