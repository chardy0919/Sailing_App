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
                        <Link to="/home">Home</Link>
                        <Link to="/myprofile">MyProfile</Link>
                        <Link to="/underway">Underway</Link>
                        <div>
                            <div>Welcome {user.first_name}</div>
                            <button onClick={handleLogout}>Logout</button>
                        </div> 
                    </>
                )}
            </Row>
        </>
    );
};

export default NavBar