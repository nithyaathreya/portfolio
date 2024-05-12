import React from "react";
import "./index.css";

interface InputProps {
	type?: "text" | "password";
	value?: any;
	name?: string;
	placeholder?: string;
  textarea?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type = "text", ...props }: InputProps) => {
	return (
    props.textarea ?
    <textarea
      className="input-root"
			placeholder={props.placeholder}
			value={props.value}
			name={props.name}
    /> :
    <input
			className="input-root"
			type={type}
			placeholder={props.placeholder}
			value={props.value}
			name={props.name}
      onChange={props.onChange}
		/>
	);
};

export default Input;
