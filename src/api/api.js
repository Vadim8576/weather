import * as axios from 'axios';

// создаем настройки axios
const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://api.gismeteo.net/v2/weather/current/?latitude=54.35&longitude=52.52',
    headers: {
        'X-Gismeteo-Token': '56b30cb255.3443075',
        'Accept-Encoding': 'deflate'
    }
});


export const api = {

    fetchWeather() {
        return instanse
                .get()
                .then(response => response.data)
                .then(data => {
                    console.log(data);
                })
    }

    
}