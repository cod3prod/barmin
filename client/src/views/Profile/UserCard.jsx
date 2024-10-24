import { useSubmit } from "react-router-dom";
import Button from "../../components/Button";
import UserItem from "./UserItem";
import EditableEmailField from "./EditableEmailField";
import EditablePasswordField from "./EditablePasswordField";

export default function UserCard({ user, setIsOpen, state, dispatch }) {
  const submit = useSubmit();

  return (
    <div className="flex flex-col justify-between mb-4 border border-gray-300 rounded-lg">
      <div className="p-4">
        <p className="text-xl font-semibold text-gray-800">유저 프로필</p>

        <UserItem label="사용자명:" value={user.username} />
        <UserItem label="권한:" value={user.role} />
        <EditableEmailField
          email={state.email}
          state={state}
          dispatch={dispatch}
        />
        <EditablePasswordField
          password={state.password}
          state={state}
          dispatch={dispatch}
        />

        <UserItem
          label="생성일:"
          value={new Date(user.createdAt).toISOString().split("T")[0]}
        />
      </div>
      <div className="p-4 flex justify-between">
        <Button
          onClick={() =>
            submit(
              {
                email: state.email,
                oldPassword: state.oldPassword,
                newPassword: state.newPassword,
                _id: user._id,
              },
              { method: "PATCH", action: "/profile" }
            )
          }
          className="bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300"
        >
          수정
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300"
        >
          탈퇴
        </Button>
      </div>
    </div>
  );
}
