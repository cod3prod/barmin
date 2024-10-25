import { useReducer } from "react";
import { twMerge } from "tailwind-merge";
import { checkReducer, initialState } from "../../reducer/checkReducer";
import { Form } from "react-router-dom";
import api from "../../config/api";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function RegisterForm({ setOnFocus }) {
  const [state, dispatch] = useReducer(checkReducer, initialState);

  const checkUsername = async (username) => {
    if (!username) {
      return dispatch({ type: "SET_CHECK_USERNAME", payload: null });
    }
    try {
      const response = await api.get(`/users/check-duplication/`, {
        params: { username },
      });
      console.log(response);
      return dispatch({ type: "SET_CHECK_USERNAME", payload: true });
    } catch (error) {
      return dispatch({ type: "SET_CHECK_USERNAME", payload: false });
    }
  };

  const checkEmail = async (email) => {
    if (!email) {
      return dispatch({ type: "SET_CHECK_EMAIL", payload: null });
    }
    if (email.indexOf("@") === -1) {
      return dispatch({ type: "SET_CHECK_EMAIL", payload: false });
    }
    try {
      const response = await api.get(`/users/check-duplication/`, {
        params: { email },
      });
      console.log(response);
      return dispatch({ type: "SET_CHECK_EMAIL", payload: true });
    } catch (error) {
      return dispatch({ type: "SET_CHECK_EMAIL", payload: false });
    }
  };

  return (
    <Form
      method="POST"
      action="/register"
      className="flex flex-col justify-between gap-4"
      noValidate
    >
      <p className="text-2xl font-bold mt-6 mb-6">Register</p>
      <div className="flex flex-col gap-0 md:gap-4">
        <Input
          type="text"
          id="username"
          required
          value={state.username}
          className={
            state.username === ""
              ? ""
              : state.checkUsername
              ? "border-green-500 ring-green-500 text-green-500"
              : "border-red-500 ring-red-500 text-red-500"
          }
          onChange={async (e) => {
            const value = e.target.value;
            dispatch({ type: "SET_USERNAME", payload: value });
            await checkUsername(value);
          }}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        >
          Username
        </Input>
        <p
          className={twMerge(
            "text-xs h-3 transform -translate-y-1.5",
            state.checkUsername ? "text-green-500" : "text-red-500"
          )}
        >
          {state.username === ""
            ? ""
            : state.checkUsername
            ? "사용가능한 Username입니다!"
            : "다른 Username을 입력해주세요."}
        </p>
        <Input
          type="email"
          id="email"
          required
          value={state.email}
          className={
            state.email === ""
              ? ""
              : state.checkEmail
              ? "border-green-500 ring-green-500 text-green-500"
              : "border-red-500 ring-red-500 text-red-500"
          }
          onChange={async (e) => {
            const value = e.target.value;
            dispatch({ type: "SET_EMAIL", payload: value });
            await checkEmail(value);
          }}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        >
          Email
        </Input>
        <p
          className={twMerge(
            "text-xs h-3 transform -translate-y-1.5",
            state.checkEmail ? "text-green-500" : "text-red-500"
          )}
        >
          {state.email === ""
            ? ""
            : state.checkEmail
            ? "사용 가능한 Email입니다!"
            : "다른 Email를 입력해주세요."}
        </p>
        <Input
          type="password"
          id="password"
          required
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        >
          Password
        </Input>
      </div>
      <div className="mt-3 md:mt-9 flex flex-col gap-4 items-center">
        <Button className="text-sm lg:text-lg h-18 w-full bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-4 focus:ring-green-300">
          등록
        </Button>
      </div>
    </Form>
  );
}
