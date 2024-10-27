import { useState, useReducer } from "react";
import { initialState, profileReducer } from "../../reducer/profileReducer";
import { redirect, useLoaderData, Navigate } from "react-router-dom";
import { flashStore } from "../../zustand/FlashStore";
import { authStore } from "../../zustand/AuthStore";
import api from "../../config/api";
import UserCard from "./UserCard";
import PostsList from "./PostsList";
import { useEffect } from "react";
import ConfirmModal from "./ConfirmModal";

export async function loader() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const reponse = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = reponse.data;
    return result;
  } catch (error) {
    flashStore.setState({
      type: "error",
      message: "Failed to load users",
      isOpen: true,
    });
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  const token = localStorage.getItem("token");

  const showMessage = (type, message) => {
    flashStore.setState({
      type,
      message,
      isOpen: true,
    });
  };

  switch (request.method) {
    case "DELETE": {
      try {
        await api.delete("/users/delete", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem("token");
        authStore.setState({ _id: "", username: "", role: "" });
        return redirect("/");
      } catch (error) {
        showMessage("error", "회원 탈퇴를 실패하셨습니다.");
      }
      break;
    }

    case "PATCH": {
      const intent = formData.get("intent");

      if (intent === "change_password") {
        const formValues = {
          username: formData.get("username"),
          password: formData.get("oldPassword"),
          newPassword: formData.get("newPassword"),
        };
        try {
          await api.patch("/users/change-password", formValues);
          showMessage("success", "비밀번호 변경했습니다!");
          return redirect("/profile");
        } catch (error) {
          showMessage("error", "비밀번호 변경을 실패하셨습니다.");
          return redirect("/profile");
        }
      }

      try {
        const formValues = {
          email: formData.get("email"),
        };
        await api.patch("/users/update", formValues, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showMessage("success", "이메일을 변경했습니다!");
        return redirect("/profile");
      } catch (error) {
        showMessage("error", "이메일 변경을 실패하셨습니다.");
        return null;
      }
    }

    default: {
      console.log("Invalid method:", request.method);
      break;
    }
  }

  return null;
}

export default function Profile() {
  const data = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { isAuthenticated } = authStore();

  useEffect(() => {
    if (data && data.user) {
      dispatch({ type: "SET_EMAIL", payload: data.user.email });
      dispatch({ type: "SET_USERNAME", payload: data.user.username });
    }
  }, [data]);

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <section className="mt-4 p-4 container lg:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserCard
            user={data.user}
            setIsOpen={setIsOpen}
            state={state}
            dispatch={dispatch}
          />
          <PostsList username={data.user.username} posts={data.locations} />
          {isOpen && <ConfirmModal setIsOpen={setIsOpen} />}
        </section>
      )}
    </>
  );
}
