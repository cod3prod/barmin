import Navbar from "../components/Navbar";
import { Form } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export default function Login() {
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        for (const [key, value] of formData.entries()){
          data[key] = value;
        }

        try {
            const response = await axios.post('http://localhost:3000/login', data, {
                headers: {
                'Content-Type': 'application/json'
                }
            });

            const result = response.data;

            if (result.success) {
                const token = jwtDecode(result.token);
                localStorage.setItem('token', token);
                alert(`${token.username}, ${result.message}`);
            }
            else {
                alert(result.message); 
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.'); 
        }

}
    
    return (
        <>
            <Navbar />
            <Form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="아이디 입력" />
                <input type="password" name="password" placeholder="비밀번호 입력" />
                <button type="submit">로그인</button>
            </Form>
        </>
    );
}