import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

export  default function WaypointCard(props){
    const navigate = useNavigate();

    const addWaypoint = async(e) => {
        e.preventDefault();
        let response = await api.put(
            `<int:underway_id>/underway_waypoints/${props.id}/`);
        api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
        navigate(0)
      }
    return (
        <>
        <div>
            <h4>{props.portName}</h4>
            <div>
                <div>{props.region}</div>
                <div>{props.countryName}</div>
                <div>{props.lat}</div>
                <div>{props.lng} days</div>
            </div>
            <button onClick={(e)=>addWaypoint(e)}>Add</button>
        </div>
        </>
    );
}