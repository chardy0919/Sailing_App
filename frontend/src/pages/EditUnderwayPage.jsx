import { useState, useEffect } from 'react';
import { api } from "../utilities"
import { useParams } from 'react-router-dom';
import UnderwayCard from '../components/UnderwayCard';


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
    
    const toggleForm = () => {
        setEditForm(!editForm);
      };

    useEffect(() => {
        const getUnderwayData = async () => {
          try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            const response = await api.get(`underway/${underway_id}/`);
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
          .catch((err)=>{
            alert("could not create Underway")
            console.error(err)
          })
        if (response.status === 201){
          window.location.reload()
        }
        setSearchValue('');
    }


return (
    <>
    <h2>{underwayData.route_name}</h2>
    
    <div>
        <UnderwayCard
        id = {underwayData.id}
        captain={underwayData.captain}
        routeName= {underwayData.route_name}
        description= {underwayData.description}
        startDate= {underwayData.start_date}
        location= {underwayData.location}
        manning= {underwayData.manning}
        duration= {underwayData.duration}
        crew={underwayData.crew}
        crewInformation= {underwayData.crew_information}
        />
    </div>
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
            </form>
        )}
    </>
    )
}
