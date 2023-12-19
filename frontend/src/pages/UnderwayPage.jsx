import { useState } from 'react';
import { api } from "../utilities";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';


export default function UnderwayPage() {
    const [routeName, setRouteName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [location, setLocation] = useState("");
    const [manning, setManning] = useState(null)
    const [duration, setDuration] = useState(null);
    
    const createUnderway = async(e) => {
        e.preventDefault();

        let data = {
            "route_name" : routeName,
            "description" : description,
            "start_date": startDate,
            "location": location,
            "manning": manning,
            "duration": duration,
        };

        let response = await api.post("underway/", data)
          .catch((err)=>{
            alert("could not create Underway")
            console.error(err)
          })
        if (response.status === 201){
          window.location.reload()
        }
    }


return (
    <>
    <h2>Create your Underway</h2>
    <Container>
        <Form onSubmit={(e) => createUnderway(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label >Customize your Underway. All fields are required.</Form.Label>
              <Form.Control 
              type="text" 
              value={routeName}
              placeholder='Name your underway'
              onChange={(e) => setRouteName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
              cols="30"
              rows="10"
              value={description}
              placeholder="Describe your journey."
              onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
              type="date" 
              value={startDate}
              placeholder='Start Date YYYY-MM-DD'
              onChange={(e) => setStartDate(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
              type="text" 
              value={location}
              placeholder='Destination'
              onChange={(e) => setLocation(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
              type="integer" 
              value={manning}
              placeholder='Manning Requirement'
              onChange={(e) => setManning(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
              type="integer" 
              value={duration}
              placeholder='Expected duration in days.'
              onChange={(e) => setDuration(e.target.value)} />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        </Container>
    </>
    )
}
