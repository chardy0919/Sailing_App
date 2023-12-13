import {useState, useEffect} from 'react';
import { api } from "../utilities";
import { Link, useNavigate, useParams } from "react-router-dom";

export  default function UnderwayCard(props){
    const navigate= useNavigate()
    const [captainData, setCaptainData] = useState("")

    useEffect(() => {
        const getCaptainData = async () => {
          try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            const response = await api.get(`user/public/${props.captain}`);
            setCaptainData(response.data);
          } catch (error) {
            console.error('Error fetching Underway data:', error.response);
            console.log(error.response.data.token);
          }
        };
        getCaptainData();  
      }, [props]);
     

    const deleteUnderway = async() => {
        let response = await api.delete(
            `underway/${props.id}/`);
        api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
        navigate(0)
      }
    return (
        <>
        <div>
            <Link to={`/editunderway/${props.id}`}>{props.routeName}</Link>
            <div>
                <div>{captainData.first_name+' '+captainData.last_name}</div>
                <div>{props.description}</div>
                <div>{props.startDate}</div>
                <div>{props.location}</div>
                <div>{props.duration} days</div>
                <div>{props.crew +' out of '+ props.manning +' have joined this crew.'}</div>
                {/* <div>{props.crewInformation}</div> */}
            </div>
            <button onClick={deleteUnderway}>Delete</button>
        </div>
        </>
    );
}

