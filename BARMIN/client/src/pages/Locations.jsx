import Navbar from "../components/Navbar";
import { Form } from "react-router-dom";

export default function Locations() {
    return (
        <>
            <Navbar />
            <Form>
                <input type='text' name='title' />
                <textarea name='description' />
            </Form>
        </>
    )
}