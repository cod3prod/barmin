import { useFetcher, useLoaderData, redirect } from 'react-router-dom';
import axios from 'axios';

export async function loader({ params }) {
    const { id } = params;
    const response = await axios.get(`http://localhost:3000/locations/${id}`);
    const result = response.data;
    
    return result;
}


export async function action({ params }) {
    const { id } = params
    const response = await axios.delete(`http://localhost:3000/locations/${id}`);
    const result = response.data;
    if(result.success){
        return redirect('/locations');
    }
}

export default function LocationDetail() {
    const data = useLoaderData();
    const fetcher = useFetcher();

    return (
        <>
            <h1>{data.title}</h1>
            <h2>{data.location}</h2>
            <p>
                <a href={`/locations/${data._id}/edit`}>Edit</a>
            </p>
            <fetcher.Form method='delete'>
                <button type='submit'>삭제</button>
            </fetcher.Form>
        </>
    )
}