import { useState, useEffect } from 'react';
import { api } from "../utilities"
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function RegisterPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [password, setPassword] = useState("")
    const { user, setUser } = useOutletContext();
    const navigate = useNavigate();

    const signUp = async(e) => {
        e.preventDefault();
        let response = await api.post(
            "user/signup/",{
                "email" : email,
                "password" : password,
                "first_name": firstName,
                "last_name":lastName,
                "qualifications":qualifications
            });
        let user = response.data.user;
        let token = response.data.token;
        api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
        setUser(user);
        localStorage.setItem("token", token);
        navigate("/home")
        navigate(0)
    }

    const logIn = async(e) => {
        e.preventDefault();
        let response = await api.post("user/login/",{"email" : email,"password" : password});
        let user = response.data.user;
        api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
        setUser(user);
        localStorage.setItem("token", response.data.token);
        navigate("/home")
        navigate(0)
    }

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <>
        <Row>
        <Col sm={6}></Col>
        <Col>
        <div className="mx-auto max-w-md p-4">
            <h2 className='text-center'>{isSignUp ? 'Sign-Up Form' : 'Log-In Form'}</h2>
            {isSignUp ? (
                <Form onSubmit={(e) => signUp(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control 
                    type="email" 
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={firstName}
                    placeholder='Jane'
                    onChange={(e) => setFirstName(e.target.value)} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={lastName}
                    placeholder='Doe'
                    onChange={(e) => setLastName(e.target.value)} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Qualification</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={qualifications}
                    placeholder='Yachtmaster'
                    onChange={(e) => setQualifications(e.target.value)} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
            ) : (
                <Form onSubmit={(e) => logIn(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Row >
                    <Col sm={7}>
                        <Button size="sm" variant="primary" type="submit">
                        Submit
                        </Button>
                    </Col>
                    <Col>
                        <p className=''>{isSignUp ? 'Already have an account?':'Don\'t have an account?'}</p>
                    </Col>
                    <Col>
                        <Button onClick={toggleForm} size="sm">{isSignUp ? 'Log-In!':'Sign-Up!'}</Button>
                    </Col> 
                </Row>

                
            </Form>
            )}
        </div>
        </Col>
        </Row>
        </>
    );
}