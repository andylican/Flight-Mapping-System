import axios from 'axios';

export function getFlights() {
    return axios({
        url: 'http://localhost:8080/flights',
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
}