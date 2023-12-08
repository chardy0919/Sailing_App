import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities"


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
            <Row>
                {user && (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/myprofile">MyProfile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </Row>
        </>
    );
};

export default NavBar