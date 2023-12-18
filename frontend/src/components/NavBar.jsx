import { useNavigate } from "react-router-dom";
import { api } from "../utilities"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




const NavBar = ({user, setUser}) => {  
    const navigate = useNavigate();  

    const handleLogout = async() => {
        let response = await api.post("user/logout/")
        if (response.status === 204){
          setUser(null)
          localStorage.removeItem("token")
          delete api.defaults.headers.common["Authorization"]
          navigate("/")
        }
      }

return (
    <>
    {user && (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container >
        <Navbar.Brand href="/home">Welcome {user.first_name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/myprofile">MyProfile</Nav.Link>
            <Nav.Link href="/underway">Underway</Nav.Link>
            <button className="btn btn-link" onClick={handleLogout}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )}
   </> 
  );
};

export default NavBar