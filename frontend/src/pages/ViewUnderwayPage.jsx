import { useState, useEffect } from 'react';
import { api } from "../utilities";
import { useParams } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';

export default function ViewUnderwayPage() {
    const [underwayData, setUnderwayData] = useState([]);
    const {underway_id} = useParams();
    const [captainData, setCaptainData] = useState("")

    useEffect(() => {
        const getUnderwayData = async () => {
          try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            const response = await api.get(`underway/${underway_id}/`);
            console.log(response.data)
            setUnderwayData(response.data);
          } catch (error) {
            console.error('Error fetching Underway data:', error.response);
            console.log(error.response.data.token);
          }
        };
        getUnderwayData();  
      }, []);

      useEffect(() => {
        const getCaptainData = async () => {
          try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            const response = await api.get(`user/public/${underwayData.captain}`);
            setCaptainData(response.data);
          } catch (error) {
            console.error('Error fetching Underway data:', error.response);
            console.log(error.response.data.token);
          }
        };
        getCaptainData();  
      }, [underwayData]);
    
    return (
        <>
        <h2>{underwayData.route_name}</h2>
        <div>
          <ul>
            <li>Name: {underwayData.route_name}</li>
            <li>Description: {underwayData.description}</li>
            <li>Start Date: {underwayData.start_date}</li>
            <li>Location: {underwayData.location}</li>
            <li>Manning: {underwayData.manning}</li>
            <li>Duration: {underwayData.duration} days</li>
          </ul>
        </div>
        {underwayData
        ?
        (<div>
          <div>
              <h4>{captainData.first_name}'s Crew</h4>
              {underwayData.crew_information && underwayData.crew_information.map((elem, idx)=>(
                <ul key = {idx}>
                  <li>Name: {elem.first_name+' '+elem.last_name}</li>
                  <li>Qualification: {elem.qualifications}</li>
                </ul>
              ))}
          </div>
          <div> 
              <h4>{captainData.first_name}'s Waypoints</h4>
              {underwayData.waypoint_information && underwayData.waypoint_information.map((elem,idx)=>(
                <WeatherCard 
                    id= {elem.id}
                    portName={elem.port_name}
                    location={elem.region+', '+elem.country_name}
                    lat={elem.lat}
                    lng= {elem.lng}
                />
              ))}
          </div>
        </div>)
        :
        <p>loading</p>
      }
      </>
    )
}