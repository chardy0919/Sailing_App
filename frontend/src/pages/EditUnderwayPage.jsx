import { useState, useEffect } from 'react';
import { api } from "../utilities"
import { useParams } from 'react-router-dom';
import UnderwayCard from '../components/UnderwayCard';
import WaypointCard from '../components/WaypointCard';
import WeatherCard from '../components/WeatherCard';


export default function EditUnderwayPage() {
  const [underwayData, setUnderwayData] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [location, setLocation] = useState("");
  const [manning, setManning] = useState(null)
  const [duration, setDuration] = useState(null);
  const [searchValue, setSearchValue] = useState("")
  const {underway_id} = useParams();
  const [editForm, setEditForm] = useState(false);
  const [waypointData, setWaypointData] = useState([])
  
  const toggleForm = () => {
      setEditForm(!editForm);
    };

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


  const editUnderway = async(e) => {
      e.preventDefault();

      let data = {}
          if (routeName){data.route_name = routeName};
          if (description){data.description= description};
          if (startDate){data.start_date= startDate};
          if (location){data.location= location};
          if (manning){data.manning= manning};
          if (duration){data.duration=duration}

      let response = await api.put(`underway/${underway_id}/`, data)
        .catch((err)=>{
          alert("could not create Underway")
          console.error(err)
        })
      if (response.status === 201){
        window.location.reload()
      }
  }

  const handleSearch = async() => {
    let response = await api.get(`waypoint/${searchValue}/`)
    console.log(response.data[1])
    setWaypointData(response.data[1])
      
    if (response.status === 201){
      window.location.reload()
    }
    setSearchValue('');
  }

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
        <h4>Your Crew</h4>
        {underwayData.crew_information && underwayData.crew_information.map((elem, idx)=>(
          <ul key = {idx}>
            <li>Name: {elem.first_name+' '+elem.last_name}</li>
            <li>Qualification: {elem.qualifications}</li>
          </ul>
        ))}
    </div>
    <div> 
        <h4>Your Waypoints</h4>
        {/* {underwayData.waypoint_information && underwayData.waypoint_information.map((elem,idx)=>(
          <ul key= {idx}>
            <li>Name: {elem.port_name}</li>
            <li>Location: {elem.region+' '+elem.country_name}</li>
            <li>Lat, Lng: {elem.lat+' , '+elem.lng}</li>
          </ul>
        ))} */}
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
  
  
  <button onClick={toggleForm}>Edit</button>
    {editForm && (
      <form onSubmit={(e) => editUnderway(e)}>
        <input 
          type="text" 
          value={routeName}
          placeholder={underwayData.route_name}
          onChange={(e) => setRouteName(e.target.value)} 
        />
        <textarea
          cols="30"
          rows="10"
          value={description}
          placeholder={underwayData.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input 
          type="date" 
          value={startDate}
          placeholder={underwayData.startDate}
          onChange={(e) => setStartDate(e.target.value)} 
        />
        <input 
          type="text" 
          value={location}
          placeholder={underwayData.location}
          onChange={(e) => setLocation(e.target.value)} 
        />
        <input 
          type="integer" 
          value={manning}
          placeholder={underwayData.manning}
          onChange={(e) => setManning(e.target.value)} 
        />
        <input 
          type="integer" 
          value={duration}
          placeholder={underwayData.duration}
          onChange={(e) => setDuration(e.target.value)} 
        />
        <button type="submit">Submit</button>
        <p>All fields are required</p>
      </form>
    )}
      <div>
        <h3>Add waypoints to your trip.</h3>
        <input 
          type="text" 
          placeholder="search" 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)}
          />
        <button onClick={()=> handleSearch()}>Search</button>
      </div>
      {waypointData &&
        (<div>
          {waypointData.map((elem,idx)=>(
            <WaypointCard
            key= {idx}
            id= {underway_id}
            portName={elem.port_name}
            region = {elem.region}
            countryName={elem.country_name}
            lat={elem.lat}
            lng= {elem.lng}
            />))}
        </div>
        )}
  </>
  )
}
