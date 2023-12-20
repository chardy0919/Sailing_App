import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export  default function WaypointCard(props){
    const navigate = useNavigate();

    const addWaypoint = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                `underway/${props.id}/underway_waypoints/`,
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
        <div className="waypoint-card">
        <Card style={{ width: '18rem' }}>
        <Container className="p-3">
            <Card.Title>{props.portName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.region}, {props.countryName}</Card.Subtitle>
            <Card.Text>{props.lat}, {props.lng}</Card.Text>
            <Button onClick={(e)=>addWaypoint(e)}>Add</Button>
        </Container>
        </Card>
        </div>
        </>
    );
}