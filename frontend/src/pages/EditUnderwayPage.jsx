import { useState, useEffect } from 'react';
import { api } from "../utilities"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ViewCrewCard from '../components/ViewCrewCard';
import WaypointCard from '../components/WaypointCard';
import WeatherCard from '../components/WeatherCard';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function EditUnderwayPage() {
  const [underwayData, setUnderwayData] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [location, setLocation] = useState("");
  const [manning, setManning] = useState(null)
  const [duration, setDuration] = useState(null);
  const [searchValue, setSearchValue] = useState("")
  const {underway_id} = useParams();
  const [editForm, setEditForm] = useState(false);
  const [waypointData, setWaypointData] = useState([])
  const navigate = useNavigate()
  
  const toggleForm = () => {
      setEditForm(!editForm);
    };

  useEffect(() => {
      const getUnderwayData = async () => {
        try {
          const token = localStorage.getItem('token');
          api.defaults.headers.common["Authorization"] = `Token ${token}`;
          const response = await api.get(`underway/${underway_id}/`);
          console.log(response.data)
          setUnderwayData(response.data);
        } catch (error) {
          console.error('Error fetching Underway data:', error.response);
          console.log(error.response.data.token);
        }
      };
      getUnderwayData();  
    }, []);


  const editUnderway = async(e) => {
      e.preventDefault();

      let data = {}
          if (routeName){data.route_name = routeName};
          if (description){data.description= description};
          if (startDate){data.start_date= startDate};
          if (location){data.location= location};
          if (manning){data.manning= manning};
          if (duration){data.duration=duration}

      let response = await api.put(`underway/${underway_id}/`, data)
        .catch((err)=>{
          alert("could not create Underway")
          console.error(err)
        })
      if (response.status === 201){
      }
      navigate(0)
  }

  const handleSearch = async() => {
    let response = await api.get(`waypoint/${searchValue}/`)
    console.log(response.data[1])
    setWaypointData(response.data[1])
      
    if (response.status === 201){
      window.location.reload()
    }
    setSearchValue('');
  }

return (
  <>
  <Container>
    <h2>{underwayData.route_name}</h2>
    <ListGroup variant="flush" className="list">
    <ListGroupItem>Description: {underwayData.description}</ListGroupItem>
    <ListGroupItem>Start Date: {underwayData.start_date}</ListGroupItem>
    <ListGroupItem>Location: {underwayData.location}</ListGroupItem>
    <ListGroupItem>Manning: {underwayData.manning}</ListGroupItem>
    <ListGroupItem>Duration: {underwayData.duration} days</ListGroupItem>
    </ListGroup>
    {underwayData
    ?
    (<div>
      <h4>Your Crew</h4>
      {underwayData.crew_information && underwayData.crew_information.map((elem, idx)=>(
        <ViewCrewCard 
          name={elem.first_name+' '+elem.last_name}
          qualifications={elem.qualifications}
        />
      ))}
      <div> 
          <h4>Your Waypoints</h4>
          {underwayData.waypoint_information && underwayData.waypoint_information.map((elem,idx)=>(
            <WeatherCard 
              id= {elem.id}
              portName={elem.port_name}
              location={elem.region+', '+elem.country_name}
              lat={elem.lat}
              lng= {elem.lng}
            />
          ))}
      </div>
    </div>)
    :
    <p>loading</p>
  }
    <button className="btn btn-link" onClick={toggleForm}>Edit</button>
      {editForm && (
        <Form onSubmit={(e) => editUnderway(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >Edit your underway.</Form.Label>
          <Form.Control  
            type="text" 
            value={routeName}
            placeholder={underwayData.route_name}
            onChange={(e) => setRouteName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control 
            cols="30"
            rows="10"
            value={description}
            placeholder={underwayData.description}
            onChange={(e) => setDescription(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control 
            type="date" 
            value={startDate}
            placeholder={underwayData.startDate}
            onChange={(e) => setStartDate(e.target.value)}/> 
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control  
            type="text" 
            value={location}
            placeholder={underwayData.location}
            onChange={(e) => setLocation(e.target.value)}/> 
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control 
            type="integer" 
            value={manning}
            placeholder={underwayData.manning}
            onChange={(e) => setManning(e.target.value)}/> 
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control  
            type="integer" 
            value={duration}
            placeholder={underwayData.duration}
            onChange={(e) => setDuration(e.target.value)}/> 
          </Form.Group>
          <Button type="submit">Submit</Button>
          <p>All fields are required</p>
        </Form>
      )}
        <Row>
        <Col>
        <Form inline>
          <Form.Control 
            type="text" 
            placeholder="Add a Waypoint"
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)} 
            className="mr-sm-2" />
        </Form>
        </Col>
        <Col>
        <Button onClick={()=> handleSearch()}>Search</Button>
        </Col>
        </Row>
        <Container className="card-container">
            {waypointData.map((elem,idx)=>(
              <WaypointCard
              key= {idx}
              id= {underway_id}
              portName={elem.port_name}
              region = {elem.region}
              countryName={elem.country_name}
              lat={elem.lat}
              lng= {elem.lng}
              />))}
        </Container>
  </Container>
  </>
  )
}
