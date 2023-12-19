import {useState, useEffect} from 'react';
import { api } from "../utilities";
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{props.routeName}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{captainData.first_name+' '+captainData.last_name}</Card.Subtitle>
      <Card.Text>
        {props.description} 
      </Card.Text>
      <Card.Text>
      <div>Departs {props.startDate}</div>
      </Card.Text>
      <Card.Link href={`/viewunderway/${props.id}`}>More Details</Card.Link>
    </Card.Body>
    <Button onClick={joinCrew}>Join</Button>
  </Card>
  </>
  );
}
