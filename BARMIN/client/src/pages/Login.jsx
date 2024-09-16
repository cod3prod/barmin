import Navbar from "../components/Navbar";
import { Form } from "react-router-dom";

export default function Login() {
    return (
        <>
            <Navbar />
            <Form method='post'>
                <input type="text" name="id" placeholder="아이디 입력" />
                <input type="password" name="pw" placeholder="비밀번호 입력" />
            </Form>
        </>
    );
}