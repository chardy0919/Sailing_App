import { useState, useEffect } from 'react';
import { api } from "../utilities"
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UnderwayCard from '../components/UnderwayCard';


export default function MyProfilePage(context) {
  const [editForm, setEditForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [underwayData, setUnderwayData] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [location, setLocation] = useState("");
  const [manning, setManning] = useState(0)
  const [duration, setDuration] = useState(1);
  const { user, setUser } = useOutletContext();


  const toggleForm = () => {
    setEditForm(!editForm);
  };

  const editInfo = async(e) => {
    e.preventDefault();
    let response = await api.put(
        "user/info/",{
            "first_name": firstName,
            "last_name":lastName,
            "qualifications":qualifications
        });
    api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
  }

  useEffect(() => {
    const getUnderwayData = async () => {
      try {
        const token = localStorage.getItem('token');
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        const response = await api.get('underway/');
        setUnderwayData(response.data);
      } catch (error) {
        console.error('Error fetching Underway data:', error.response);
        console.log(response.data.token)
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
        <h3>Underways</h3>
        <div>{console.log(underwayData)}</div>
        <div>
            {underwayData.map((elem, idx)=>(
              <UnderwayCard
                key = {idx}
                routeName= {elem.route_name}
                description= {elem.description}
                startDate= {elem.start_date}
                location= {elem.location}
                manning= {elem.manning}
                duration= {elem.duration}
              />
            ))}
          </div>
        <div>
          <h3>Crews</h3>
        </div>

      </div>
    </>
  );
}
  