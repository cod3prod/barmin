import { useLoaderData } from 'react-router-dom';
import axios from 'axios'

export async function loader() {
  const response = await axios.get('http://localhost:3000/locations');
  const result = response.data;

  return result;
}

export default function LocationsList() {
  const data = useLoaderData();

  return (
    <>
      <h1>Locations</h1>
      <div>
        <a href="/locations/new">새로운 장소 추가</a>
      </div>
      <ul>
        {data.map((el, idx)=>{
          return(
            <li key={idx}>
              <a href={`/locations/${el._id}`}>{el.title}</a>
            </li>
          )
        })}
      </ul>
    </>
  )
}