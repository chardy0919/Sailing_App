import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

export  default function WaypointCard(props){
    const navigate = useNavigate();

    // const addWaypoint = async(e) => {
    //     e.preventDefault();
    //     let response = await api.put(
    //         `${props.underway_id}/underway_waypoints/${props.id}/`);
    //     api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
    //     navigate(0)
    //   }

    const addWaypoint = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                `underway/${props.underway_id}/underway_waypoints/`,
                {
                    port_name: props.portName,
                    region: props.region,
                    country_name: props.countryName,
                    lat: props.lat,
                    lng: props.lng,
                }
            );
            navigate(0);
        } catch (error) {
            console.error("Error adding waypoint:", error);
            
        }
    };
    return (
        <>
        <div>
            <h4>{props.portName}</h4>
            <div>
                <div>{props.region}</div>
                <div>{props.countryName}</div>
                <div>{props.lat}</div>
                <div>{props.lng}</div>
            </div>
            <button onClick={(e)=>addWaypoint(e)}>Add</button>
        </div>
        </>
    );
}