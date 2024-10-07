import NavButton from "../../components/NavButton";

export default function LocationsList({ data }) {

  return (
    <>
      {data.map((el) => (
        <div
          key={el._id}
          className="card mb-4 border border-gray-300 rounded-lg"
        >
          <div className="flex">
            <div className="w-1/3">
              <img className="w-full h-auto" alt="" src={el.images[0].url} />
            </div>
            <div className="w-2/3 p-4">
              <h5 className="text-lg font-bold">{el.title}</h5>
              <p>{el.description}</p>
              <p className="text-gray-500 mb-3">{el.address}</p>
              <NavButton to={`/locations/${el._id}`}>상세 정보</NavButton>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
