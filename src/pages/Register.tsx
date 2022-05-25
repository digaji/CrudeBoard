import InputBox from "../common/InputBox";
import { useState } from "react";
import axios from "axios";

export default function Register(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url: string = "http://localhost:3000/api/v1/auth/register";

  return (
    <div className="mt-[5rem]">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(email, password);
          const res = await axios.post(url, {
            username: email,
            password: password,
          });
          console.log(res);
        }}
        className="mx-auto grid max-w-md grid-cols-1 gap-6 rounded-md border-2 border-slate-100"
      >
        <h1 className="my-5 text-center text-2xl font-medium text-white">Create An Account</h1>
        <InputBox
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          name="email"
          id="email"
          placeholder="Email Address"
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <InputBox onChange={(e) => {}} type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" />
        <input
          type="submit"
          value="Register"
          className="my-8 mx-auto w-2/6 cursor-pointer rounded bg-sky-500 p-2 text-white hover:bg-sky-600 active:bg-sky-700"
        />
      </form>
    </div>
  );
}
