import Navbar from "../components/Navbar";
import { Form } from "react-router-dom";

export default function SignUp() {
    return (
        <>
            <Navbar />
            <Form method='post'>
                <input type="text" name="id" placeholder="아이디 입력" />
                <input type="password" name="pw" placeholder="비밀번호 입력" />
                <input type="password" name="pw2" placeholder="비밀번호 확인" />
                <input type="text" name="username" placeholder="사용자명" />
            </Form>
        </>
    );
}