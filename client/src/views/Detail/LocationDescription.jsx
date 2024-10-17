export default function LocationDescription({data}) {
  return (
    <>
      <div className="p-4">
        <p className="text-lg font-bold">{data.title}</p>
        <p className="border-b border-gray-200 pt-1 pb-2 mb-4 text-gray-500">
          {data.address}
        </p>
        <p className="mb-10">{data.description}</p>
      </div>

      <div className="text-right p-4 text-gray-500">
        {new Date(data.createdAt).toISOString().split("T")[0]}
      </div>
    </>
  );
}
