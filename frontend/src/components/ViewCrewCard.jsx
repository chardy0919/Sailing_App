import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';


export default function ViewCrewCard(props) {


return(
    <>
    <ListGroup variant="flush" className="list">
        <ListGroupItem>Name: {props.name}<br/>Qualification: {props.qualifications}</ListGroupItem>
    </ListGroup>
    <hr/>
    </>
)}