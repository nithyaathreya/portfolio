import React from 'react';
import "./index.css";

interface Props {
  icon: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const FabButton = (props: Props) => {
  return (
    <button className='fab-button' onClick={props.onClick}>{props.icon}</button>
  )
}

export default FabButton;
