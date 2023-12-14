import { useState, useEffect } from 'react';
import { api } from "../utilities"


export default function UnderwayPage() {
    const [routeName, setRouteName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [location, setLocation] = useState("");
    const [manning, setManning] = useState(null)
    const [duration, setDuration] = useState(null);
    
    const createUnderway = async(e) => {
        e.preventDefault();

        let data = {
            "route_name" : routeName,
            "description" : description,
            "start_date": startDate,
            "location": location,
            "manning": manning,
            "duration": duration,
        };

        let response = await api.post("underway/", data)
          .catch((err)=>{
            alert("could not create Underway")
            console.error(err)
          })
        if (response.status === 201){
          window.location.reload()
        }
    }


return (
    <>
    <h2>Create your Underway</h2>
        <form onSubmit={(e) => createUnderway(e)}>
            <input 
                type="text" 
                value={routeName}
                placeholder='Name your underway'
                onChange={(e) => setRouteName(e.target.value)} 
            />
            <textarea
                cols="30"
                rows="10"
                value={description}
                placeholder="Describe your journey."
                onChange={(e) => setDescription(e.target.value)}
            />
            <input 
                type="date" 
                value={startDate}
                placeholder='Start Date YYYY-MM-DD'
                onChange={(e) => setStartDate(e.target.value)} 
            />
            <input 
                type="text" 
                value={location}
                placeholder='Destination'
                onChange={(e) => setLocation(e.target.value)} 
            />
            <input 
                type="integer" 
                value={manning}
                placeholder='Manning Requirement'
                onChange={(e) => setManning(e.target.value)} 
            />
            <input 
                type="integer" 
                value={duration}
                placeholder='Expected duration in days'
                onChange={(e) => setDuration(e.target.value)} 
            />
            <button type="submit">Submit</button>
            <p>All fields are required</p>
        </form>
    </>
    )
}
