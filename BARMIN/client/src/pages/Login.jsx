import { useState } from 'react';
import Navbar from "../components/Navbar";
import { Form, redirect } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const [token, setToken] = useState();
    const { login } = useAuth();
    
    return (
        <>
            <Navbar />
            <Form method='post'>
                <input type="text" name="username" placeholder="아이디 입력" />
                <input type="password" name="password" placeholder="비밀번호 입력" />
                <button type="submit">로그인</button>
            </Form>
        </>
    );
}

export async function action({request}) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);
    
    const response = await axios.post('http://localhost:3000/login', postData, {
        headers: {
        'Content-Type': 'application/json'
        }
    });

    const result = response.data;

    if (result.success) {
        const token = result.token
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        alert(`${decoded.username}, ${result.message}`);
        return redirect('/locations'); 
    }
    else {
        return alert(result.message); 
    }
}