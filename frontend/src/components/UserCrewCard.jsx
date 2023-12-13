import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

export  default function UserCrewCard(props){
    const navigate = useNavigate();

    const leaveCrew = async(e) => {
        e.preventDefault();
        let response = await api.delete(
            `underway/underway_crew/${props.id}/`);
        api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
        navigate(0)
      }
    return (
        <>
        <div>
            <h4>{props.routeName}</h4>
            <div>
                <div>{props.description}</div>
                <div>{props.startDate}</div>
                <div>{props.location}</div>
                <div>{props.duration} days</div>
                <div>{props.crew.length+' out of '+props.manning+' have joined this crew.'}</div>
            </div>
            <button onClick={(e)=>leaveCrew(e)}>Leave</button>
        </div>
        </>
    );
}