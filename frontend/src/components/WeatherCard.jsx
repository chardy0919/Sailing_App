import { useState, useEffect } from 'react';
import { api } from "../utilities"



export default function WeatherCard(props) {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const response = await api.get(`waypoint/weather/${props.id}/`);
                
                if(response.error){
                    setWeatherData(response.reason)
                }else{
                setWeatherData(response.data)
                console.log(response.data)
                }
            }catch(error){
                console.error("Error getting weather", error);
            }
        };
        getWeather()
    }, [props.id]);

return (
    <>
    <div>
        <h5>{props.portName}</h5>
        <div>
            <div>{props.region}</div>
            <div>{props.location}</div>
            <div>{props.lat+', '+props.lng}</div>
        </div>
        {weatherData && (<div>
            <h6>Local weather in {props.portName}</h6>
            <ul>
                <div>{weatherData.temperature_2m}°C</div>
                <div>{weatherData.precipitation*100}% chance of precipitation</div>
                <div>{weatherData.wind_speed_10m} knots gusting to {weatherData.wind_gusts_10m} knots from {weatherData.wind_direction_10m}°</div>
                
            </ul>
        </div>
        )};
    </div>
    </>
)}