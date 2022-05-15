import InputBox from "../common/InputBox";

export default function Register(): JSX.Element {
  return (
    <div className="mt-[5rem]">
      <form action="" className="mx-auto grid max-w-md grid-cols-1 gap-6 rounded-md border-2 border-slate-100">
        <h1 className="my-5 text-center text-2xl font-medium text-white">Create An Account</h1>
        <InputBox type="text" name="email" id="email" placeholder="Email Address" />
        <InputBox type="password" name="password" id="password" placeholder="Password" />
        <InputBox type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" />
        <input
          type="submit"
          value="Register"
          className="my-8 mx-auto w-2/6 cursor-pointer rounded bg-sky-500 p-2 text-white hover:bg-sky-600 active:bg-sky-700"
        />
      </form>
    </div>
  );
}
