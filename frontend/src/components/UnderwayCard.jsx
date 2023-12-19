import {useState, useEffect} from 'react';
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
      <Card>
      <Card.Body>
        <Card.Title >{props.routeName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{captainData.first_name+' '+captainData.last_name}</Card.Subtitle>
        <Card.Text>{props.description}</Card.Text>
        <ListGroup variant="flush">
        <ListGroup.Item>Departs: {props.startDate}</ListGroup.Item>
        <ListGroup.Item>Destination: {props.location}</ListGroup.Item>
        <ListGroup.Item>{props.duration} Day Trip</ListGroup.Item>
        <ListGroup.Item>{props.crew.length +' out of '+ props.manning +' have joined this crew.'}</ListGroup.Item>
        </ListGroup>
        <Card.Link href={`/editunderway/${props.id}`}>Edit Underway</Card.Link>
      </Card.Body>
        <Button variant="danger" onClick={deleteUnderway}>Delete</Button>
      </Card>
    </>
  );
}

