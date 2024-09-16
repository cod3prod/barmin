import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();

  return (
    <div id="error-page">
      <h1>오류가 발생했습니다.</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
  
      <button onClick={()=>{navigate(-1)}}>돌아가기</button>
    </div>
  )
}
