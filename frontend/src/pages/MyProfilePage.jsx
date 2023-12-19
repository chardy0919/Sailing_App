import { useState, useEffect } from 'react';
import { api } from "../utilities"
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UnderwayCard from '../components/UnderwayCard';
import UserCrewCard from '../components/UserCrewCard';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function MyProfilePage(context) {
  const [editForm, setEditForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [underwayData, setUnderwayData] = useState([]);
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const toggleForm = () => {
    setEditForm(!editForm);
  };

  const editInfo = async(e) => {
    e.preventDefault();
    let data = {};
    if (firstName){data.first_name=firstName};
    if (lastName){data.last_name=lastName};
    if (qualifications){data.qualifications=qualifications}

    let response = await api.put(
        "user/info/", data);
    api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
    navigate(0)
  }


  useEffect(() => {
    const getUnderwayData = async () => {
      try {
        const token = localStorage.getItem('token');
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        const response = await api.get('underway/allunderways/');
        // console.log(response);
        setUnderwayData(response.data);
      } catch (error) {
        console.error('Error fetching Underway data:', error.response);
        console.log(error.response.data.token);
      }
    };
    getUnderwayData();  
  }, []);

  return (
    <>
      <Container >
        <Row>
        <Col>
          <Row >
            <Col><h2>MyProfile</h2></Col>
            <Col className="flex justify-end btn btn-link"><button onClick={toggleForm}>Edit</button></Col>
          </Row>
      <Container>
        {user ? (
          <ListGroup variant="flush">
            <ListGroupItem>{user.first_name}</ListGroupItem>
            <ListGroupItem>{user.last_name}</ListGroupItem>
            <ListGroupItem>{user.qualifications}</ListGroupItem>
          </ListGroup>
        ) : (
          <p>Loading user data...</p>
        )}
        
        {editForm && (
          <Form onSubmit={(e) => editInfo(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label >Change your profile.</Form.Label>
              <Form.Control 
              type="text" 
              value={firstName}
              placeholder='First Name'
              onChange={(e) => setFirstName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
              type="text" 
              value={lastName}
              placeholder='Last Name'
              onChange={(e) => setLastName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
              type="text" 
              value={qualifications}
              placeholder='Qualifications'
              onChange={(e) => setQualifications(e.target.value)} />
          </Form.Group>
          <Button type="submit">Submit</Button>
          </Form>
        )}
        </Container>
        </Col>
        <Col xs={6}></Col>
        </Row>
      </Container>
      <Container>
        <h3>My Underways</h3>
        <Container className="card-grid">
            {underwayData.filter((elem)=>elem.captain==(user.id))
            .map((elem, idx)=>(
              <UnderwayCard
                key = {idx}
                id = {elem.id}
                captain={elem.captain}
                routeName= {elem.route_name}
                description= {elem.description}
                startDate= {elem.start_date}
                location= {elem.location}
                manning= {elem.manning}
                duration= {elem.duration}
                crew= {elem.crew}
                crewInformation= {elem.crew_information}
              />
            ))}
          </Container>
          <h3>Other Underways</h3>
          <Container className="card-grid">
            {underwayData.filter((elem)=>elem.crew.includes(user.id))
            .map((elem, idx)=>(
              <UserCrewCard
                key = {idx}
                id = {elem.id}
                routeName= {elem.route_name}
                description= {elem.description}
                startDate= {elem.start_date}
                location= {elem.location}
                manning= {elem.manning}
                duration= {elem.duration}
                crew= {elem.crew}
              />
            ))}
          </Container>
        </Container>
    </>
  );
}
  