export default function UserItem({ label, value}) {
  return (
    <div className="mt-3">
    <span className="block text-sm font-medium text-gray-600">
        {label}
    </span>
    <span className="text-lg text-gray-900">{value}</span>
  </div>
  )
}