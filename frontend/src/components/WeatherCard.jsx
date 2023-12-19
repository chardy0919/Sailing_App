import { useState, useEffect } from 'react';
import { api } from "../utilities"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



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

// return (
//     <>
//     <div>
//         <h5>{props.portName}</h5>
//         <div>
//             <div>{props.region}</div>
//             <div>{props.location}</div>
//             <div>{props.lat+', '+props.lng}</div>
//         </div>
//         {weatherData && (<div>
//             <h6>Local weather in {props.portName}</h6>
//             <ul>
//                 <div>{weatherData.temperature_2m}°C</div>
//                 <div>{weatherData.precipitation*100}% chance of precipitation</div>
//                 <div>{weatherData.wind_speed_10m} knots gusting to {weatherData.wind_gusts_10m} knots from {weatherData.wind_direction_10m}°</div>   
//             </ul>
//         </div>
//         )}
//     </div>
//     </>
// )}
return (
    <>
    <Card>
    <Card.Body>
        <Card.Title >{props.portName}</Card.Title >
        <Card.Subtitle className="mb-2 text-muted">{props.region} {props.location}</Card.Subtitle>
            <div>{props.lat+', '+props.lng}</div> 
        {weatherData && (
            <div>
            <Card.Title >Local weather in {props.portName}</Card.Title >
            <ListGroup variant="flush">
                <ListGroup.Item>{weatherData.temperature_2m}°C</ListGroup.Item>
                <ListGroup.Item>{weatherData.precipitation*100}% chance of precipitation</ListGroup.Item>
                <ListGroup.Item>{weatherData.wind_speed_10m} knots gusting to {weatherData.wind_gusts_10m} knots from {weatherData.wind_direction_10m}°</ListGroup.Item>   
            </ListGroup>
        </div>
        )}
    </Card.Body>
    </Card>
    </>
)}