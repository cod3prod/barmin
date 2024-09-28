export default function InputField({
  label,
  type = "text",
  id,
  value,
  onChange = () => {},
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700" htmlFor={id}>
        {label}
      </label>
      {type !== "textarea" ? (
        <input
          className="border border-gray-300 p-2 w-full"
          onChange={onChange}
          type={type}
          id={id}
          name={id}
          value={value}
        />
      ) : (
        <textarea
          className="border border-gray-300 p-2 w-full"
          onChange={onChange}
          id={id}
          name={id}
          value={value}
        />
      )}
    </div>
  );
}
