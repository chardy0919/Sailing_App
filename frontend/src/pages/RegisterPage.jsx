import { useState, useEffect } from 'react';
import { api } from "../utilities"
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [password, setPassword] = useState("")
    // const [email2, setEmail2] = useState("")
    // const [password2, setPassword2] = useState("")
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

    useEffect(()=>{
        console.log(user)
    },[user])

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        // <>
        //     <h2>Log-In Form</h2>
        //     <form onSubmit={(e)=> logIn(e)}> 
        //         <input 
        //             type="email" 
        //             value={email}
        //             placeholder='Email'
        //             onChange={(e) => setEmail(e.target.value)} 
        //         />
        //         <input 
        //             type="password" 
        //             value={password}
        //             placeholder='Password'
        //             onChange={(e) => setPassword(e.target.value)} 
        //         />
        //         <button type="submit">Submit</button>
        //     </form>
        //     <h3>Don't have an account? </h3>
        //     <button>Sign-Up!</button>
        //     <form onSubmit={(e)=> signUp(e)}> 
        //         <input 
        //             type="email" 
        //             value={email2}
        //             placeholder='Email*'
        //             onChange={(e) => setEmail2(e.target.value)} 
        //         />
        //         <input 
        //             type="text" 
        //             value={firstName}
        //             placeholder='First Name'
        //             onChange={(e) => setFirstName(e.target.value)} 
        //         />
        //         <input 
        //             type="text" 
        //             value={lastName}
        //             placeholder='Last Name'
        //             onChange={(e) => setLastName(e.target.value)} 
        //         />
        //         <input 
        //             type="text" 
        //             value={qualifications}
        //             placeholder='Qualifications'
        //             onChange={(e) => setQualifications(e.target.value)} 
        //         />
        //         <input 
        //             type="password" 
        //             value={password2}
        //             placeholder='Password*'
        //             onChange={(e) => setPassword2(e.target.value)} 
        //         />
        //         <button type="submit">Submit</button>
        //         <p>*required</p>
        //     </form>
        // </>
        <>
        <h2>{isSignUp ? 'Sign-Up Form' : 'Log-In Form'}</h2>
        {isSignUp ? (
            <form onSubmit={(e) => signUp(e)}>
                <input 
                    type="email" 
                    value={email}
                    placeholder='Email*'
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="text" 
                    value={firstName}
                    placeholder='First Name'
                    onChange={(e) => setFirstName(e.target.value)} 
                />
                <input 
                    type="text" 
                    value={lastName}
                    placeholder='Last Name'
                    onChange={(e) => setLastName(e.target.value)} 
                />
                <input 
                    type="text" 
                    value={qualifications}
                    placeholder='Qualifications'
                    onChange={(e) => setQualifications(e.target.value)} 
                />
                <input 
                    type="password" 
                    value={password}
                    placeholder='Password*'
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Submit</button>
                <p>*required</p>
            </form>
        ) : (
            <form onSubmit={(e) => logIn(e)}>
                <input 
                    type="email" 
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>
        )}
        <h3>{isSignUp ? 'Already have an account?':'Don\'t have an account?'}</h3>
        <button onClick={toggleForm}>{isSignUp ? 'Log-In!':'Sign-Up!'}</button>
    </>
    );
}