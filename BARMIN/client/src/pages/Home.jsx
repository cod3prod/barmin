import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        주변의 철봉을 찾아보세요!
      </h1>
      <p>
        운동을 더 쉽게, 더 가까이.
      </p>
      <button onClick={()=>{
        navigate("/locations");
      }}>
        시작하기
      </button>
    </div>
  )
}

export default function Index() {
  return (
    <>
      <Navbar />
      <Landing />
    </>
    
  )
}