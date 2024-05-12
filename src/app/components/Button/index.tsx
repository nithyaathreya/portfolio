import React from "react";
import "./index.css";

interface ButtonProps {
	value: string;
	onClick?: () => void;
	type?: "primary" | "secondary" | "outlined";
  glyphIcon?: string;
}

const Button = ({ type = "primary", ...props }: ButtonProps) => {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    const button = buttonRef.current;

    if (button) {
      const moveEffect = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.target.style.setProperty('--x', `${x}px`);
        e.target.style.setProperty('--y', `${y}px`);
      };

      const leaveEffect = () => {
        button.style.setProperty('--x', '-50px');
        button.style.setProperty('--y', '-50px');
      };

      button.addEventListener('mousemove', moveEffect);
      button.addEventListener('mouseleave', leaveEffect);
      return () => {
        button.removeEventListener('mousemove', moveEffect);
        button.removeEventListener('mouseleave', leaveEffect);
      };
    }
  }, []);

	return (
		<button
      ref={buttonRef}
			// className={`button-root btn-${type}`}
			className={`glassButton`}
			{...(props.onClick ? { onClick: props.onClick } : {})}
		>
			{props.glyphIcon} {props.value}
		</button>
	);
};

export default Button;
