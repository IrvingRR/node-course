const axios = require('axios');

class Searches {
    history = ['Tegucigalpa', 'Madrid', 'San José'];

    constructor() {
        // TODO: Read DB if exist
    }

    async city (place = '') {
        try {

            // HTTP request
            const response = await axios('https://reqres.in/api/users?page=2');
            console.log(response);
        
            return []; // Return all the places that coincide with the search

        } catch (error) {
            return [];
        }
    } 
};

module.exports = Searches;