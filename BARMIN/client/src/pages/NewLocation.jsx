import { useFetcher, redirect } from "react-router-dom";
import axios from "axios";

export async function action({request}){
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);
    console.log(formData);
    const response = await axios.post('http://localhost:3000/locations', postData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const result = response.data;
    
    if(result.success) {
        return redirect(`/locations/${result.redirect}`);
    }

}

export default function NewLocation() {
  const fetcher = useFetcher();
  return (
    <>
      <fetcher.Form method="post" name="locations">
        <div>
          <label htmlFor="title">제목</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="location">장소</label>
          <input type="text" id="location" name="location" />
        </div>
        <button type="submit">생성</button>
      </fetcher.Form>
      <a href="/locations">돌아가기</a>
    </>
  );
}
