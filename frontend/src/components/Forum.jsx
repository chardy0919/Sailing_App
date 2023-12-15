import {useState, useEffect} from 'react';
import { api } from "../utilities";
import { Link, useNavigate, useParams } from "react-router-dom";

export  default function Forum(props){
    const navigate = useNavigate()
    const [captainData, setCaptainData] = useState("")

    const joinCrew = async() => {
        let response = await api.put(`underway/underway_crew/${props.id}/`);
        api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
        navigate(0)
      }

    useEffect(() => {
        const getCaptainData = async () => {
          try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            const response = await api.get(`user/public/${props.captain}`);
            console.log(response.data);
            setCaptainData(response.data);
          } catch (error) {
            console.error('Error fetching Underway data:', error.response);
            console.log(error.response.data.token);
          }
        };
        getCaptainData();  
    }, []);

    return (
        <>
        <div>
            <Link to={`/viewunderway/${props.id}`}>{props.routeName}</Link>
            <div>
                <div>{captainData.first_name+' '+captainData.last_name}</div>
                <div>{props.description}</div>
                <div>{props.startDate}</div>
                <div>{props.location}</div>
                <div>{props.duration} days</div>
                <div>{props.crew.length+' out of '+props.manning+' have joined this crew.'}</div>
            </div>
            <button onClick={joinCrew}>Join</button>
        </div>
        </>
    );
}
