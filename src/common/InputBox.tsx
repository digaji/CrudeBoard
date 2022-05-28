export default function InputBox(props: {
  type: string;
  placeholder: string;
  name: string;
  id: string;
  pattern?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element {
  return (
    <input
      type={props.type}
      className="form-input
    mx-auto
    block
    w-5/6
    rounded-md
    border-gray-300
    shadow-sm
    invalid:text-pink-600 invalid:ring-pink-500 focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      pattern={props.pattern}
      onChange={props.onChange}
    />
  );
}
