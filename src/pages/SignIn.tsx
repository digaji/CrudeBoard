import React from "react";
import InputBox from "../common/InputBox";
import axios from "axios";
import { Cookies } from "react-cookie";

class SignIn extends React.Component<{ cookies: Cookies }, { email: string; password: string; errorContent: JSX.Element }> {
  url: string;
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorContent: <p></p>,
    };
    this.url = "http://localhost:3000/api/v1/auth/login";

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: { target: any }) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // @ts-ignore
    this.setState({ [name]: value });
  }

  handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Reset all input
    Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));

    try {
      const res = await axios.post(this.url, {
        username: this.state.email,
        password: this.state.password,
      });

      if (res.status === 200) {
        console.log(res);
        this.props.cookies.set("sessionId", res.data, { path: "/" });
        console.log(this.props.cookies.get("sessionId"));
      }
    } catch (error) {
      console.log(error);
      this.setState({
        // @ts-ignore
        errorContent: <p className="mt-5 text-center text-2xl font-medium text-red-500">{error.response.data}</p>,
      });
    }
  };

  render() {
    return (
      <div className="mt-[5rem]">
        <form onSubmit={this.handleSubmit} className="mx-auto grid max-w-md grid-cols-1 gap-5 rounded-md border-2 border-slate-100">
          <h1 className="my-5 text-center text-2xl font-medium text-white">Sign In</h1>
          <label htmlFor="email" className="pl-10 text-lg font-medium text-white">
            Email Address
          </label>
          {/* Pattern checking for Email Addresses */}
          <InputBox onChange={this.handleChange} type="text" name="email" id="email" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" placeholder="Email Address" />
          <label htmlFor="password" className="pl-10 text-lg font-medium text-white">
            Password
          </label>
          {/* Pattern checking for password (must be more than 5 characters) */}
          <InputBox onChange={this.handleChange} type="password" name="password" id="password" pattern="^.{5,}$" placeholder="Password" />
          {this.state.errorContent}
          <button type="submit" className="my-8 mx-auto w-2/6 cursor-pointer rounded bg-sky-500 p-2 text-white hover:bg-sky-600 active:bg-sky-700">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
