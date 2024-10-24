import { useState } from "react";
import { FaEraser } from "react-icons/fa";
import PasswordModal from "./PasswordModal";

export default function EditablePasswordField({ state, dispatch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mt-3">
      <span className="block text-sm font-medium text-gray-600">비밀번호:</span>
      <div className="relative flex justify-between items-center">
        <span className="text-lg text-gray-900">*********</span>

        <FaEraser
          size={24}
          className="ml-4 text-slate-400 hover:text-black cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {isModalOpen && (
        <PasswordModal
          state={state}
          dispatch={dispatch}
          setIsOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
