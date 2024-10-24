import { useSubmit } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordModal({ state, dispatch, setIsOpen }) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const submit = useSubmit();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-4 rounded-lg">
        <p className="text-lg font-bold mb-4">비밀번호 수정</p>
        <div className="flex flex-col mb-2 relative">
          <label htmlFor="oldPassword" className="mb-1">
            현재 비밀번호
          </label>
          <input
            type={showOldPassword ? "text" : "password"}
            name="oldPassword"
            id="oldPassword"
            value={state.oldPassword}
            onChange={(e) =>
              dispatch({ type: "SET_OLD_PASSWORD", payload: e.target.value })
            }
            className="text-lg text-gray-900 border rounded p-1 w-full"
          />
          <div
            onClick={() => setShowOldPassword(!showOldPassword)}
            className="cursor-pointer absolute right-2 top-9"
          >
            {showOldPassword ? (
              <FaEyeSlash
                size={20}
                className="text-slate-400 hover:text-black"
              />
            ) : (
              <FaEye size={20} className="text-slate-400 hover:text-black" />
            )}
          </div>
        </div>

        <div className="flex flex-col mb-2 relative">
          <label htmlFor="newPassword" className="mb-1">
            새로운 비밀번호
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            id="newPassword"
            value={state.newPassword}
            onChange={(e) =>
              dispatch({ type: "SET_NEW_PASSWORD", payload: e.target.value })
            }
            className="text-lg text-gray-900 border rounded p-1 w-full"
          />
          <div
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="cursor-pointer absolute right-2 top-9"
          >
            {showNewPassword ? (
              <FaEyeSlash
                size={20}
                className="text-slate-400 hover:text-black"
              />
            ) : (
              <FaEye size={20} className="text-slate-400 hover:text-black" />
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Button
            className="w-20 bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300"
            onClick={() => {
              submit(
                {
                  intent: "change_password",
                  username: state.username,
                  oldPassword: state.oldPassword,
                  newPassword: state.newPassword,
                },
                { method: "PATCH", action: "/profile" }
              );
              setIsOpen(false);
            }}
          >
            저장
          </Button>
          <Button className="w-20" onClick={() => setIsOpen(false)}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}
