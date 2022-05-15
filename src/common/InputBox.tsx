export default function InputBox(props: { type: string, placeholder: string, name: string, id: string }): JSX.Element {
  return (
    <input type={props.type}
    className="form-input
    block
    w-5/6
    mx-auto
    rounded-md
    border-gray-300
    shadow-sm
    focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
    name={props.name}
    id={props.id}
    placeholder={props.placeholder} />
  )
}
