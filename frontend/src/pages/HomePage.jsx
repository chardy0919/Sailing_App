import { useState, useEffect } from 'react';
import { api } from "../utilities"
import { useOutletContext } from "react-router-dom";
import Forum from '../components/Forum';

export default function HomePage() {
  const [underwayData, setUnderwayData] = useState([]);
  const { user, setUser } = useOutletContext();

  useEffect(() => {
    const getUnderwayData = async () => {
      try {
        const token = localStorage.getItem('token');
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        const response = await api.get('underway/allunderways/');
        // console.log(response);
        setUnderwayData(response.data);
      } catch (error) {
        console.error('Error fetching Underway data:', error.response);
        console.log(error.response.data.token);
      }
    };
    getUnderwayData();  
  }, []);

  return (
    <>
      <h1>Find your next crew.</h1>
      <h2>Underways List</h2>
        <div>
            {underwayData.filter((elem)=>!elem.crew.includes(user.id)&&elem.captain != user.id)
            .map((elem, idx)=>(
              <Forum
                key = {idx}
                id = {elem.id}
                captain = {elem.captain}
                routeName= {elem.route_name}
                description= {elem.description}
                startDate= {elem.start_date}
                location= {elem.location}
                manning= {elem.manning}
                duration= {elem.duration}
                crew={elem.crew}
              />
            ))}
          
          </div>
    </>
  )
}
  
 