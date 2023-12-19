import { api } from "../utilities";
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


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
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{props.routeName}</Card.Title>
            <Card.Text>{props.description}</Card.Text>
            <ListGroup variant="flush">
                <ListGroup.Item>{props.startDate}</ListGroup.Item>
                <ListGroup.Item>{props.location}</ListGroup.Item>
                <ListGroup.Item>{props.duration} days</ListGroup.Item>
                <ListGroup.Item>{props.crew.length+' out of '+props.manning+' have joined this crew.'}</ListGroup.Item>
            </ListGroup>
            <Card.Link href={`/viewunderway/${props.id}`}>Go to this Underway</Card.Link>
        </Card.Body>
        <Button variant="warning" onClick={(e)=>leaveCrew(e)}>Leave</Button>
        </Card>
        </>
    );
}