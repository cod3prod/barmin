import { useRef } from 'react';
import Navbar from '../components/Navbar';
import { Form } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    for (const [key, value] of formData.entries()){
      data[key] = value;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = response.data;

      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message); 
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); 
    }

  }
  return (
    <>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="아이디 입력" required />
        <input type="password" name="password" placeholder="비밀번호 입력" required />
        <input type="email" name="email" placeholder="이메일 입력" required />
        <button type="submit">등록</button>
      </Form>
    </>
  );
}
