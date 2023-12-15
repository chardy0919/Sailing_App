import { useState, useEffect } from 'react';
import { api } from "../utilities"
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UnderwayCard from '../components/UnderwayCard';
import UserCrewCard from '../components/UserCrewCard';


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
      <h2>MyProfile</h2>
      <div>
        {user ? (
          <div>
            <ul>
              <li>First Name: {user.first_name}</li>
              <li>Last Name: {user.last_name}</li>
              <li>Qualifications: {user.qualifications}</li>
            </ul>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <button onClick={toggleForm}>Edit</button>
        {editForm && (
          <form onSubmit={(e) => editInfo(e)}>
            <input
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              value={qualifications}
              placeholder="Qualifications"
              onChange={(e) => setQualifications(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      <div>
        <h3>My Underways</h3>
        <div>
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
          </div>
        <div>
          <h3>Other Underways</h3>
          <div>
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
          </div>
        </div>
      </div>
    </>
  );
}
  