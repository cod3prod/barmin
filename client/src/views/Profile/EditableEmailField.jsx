import { useState } from "react";
import { FaEraser } from "react-icons/fa";

export default function EditableEmailField({ state, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mt-3">
      <span className="block text-sm font-medium text-gray-600">이메일:</span>
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
            className="text-lg text-gray-900 border rounded p-1"
          />
        ) : (
          <span className="text-lg text-gray-900">{state.email}</span>
        )}
        <FaEraser
          size={24}
          className="transform translate-y-0.5 text-slate-400 hover:text-black cursor-pointer"
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>
    </div>
  );
}
