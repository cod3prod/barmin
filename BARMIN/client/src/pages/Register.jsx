import { useRef } from 'react';
import Navbar from '../components/Navbar';
import { Form } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

  return (
    <>
      <Navbar />
      <Form method='post' action='http://localhost:3000/register'>
        <input type="text" name="username" placeholder="아이디 입력" required />
        <input type="password" name="password" placeholder="비밀번호 입력" required />
        <input type="email" name="email" placeholder="이메일 입력" required />
        <button type="submit">등록</button>
      </Form>
    </>
  );
}
