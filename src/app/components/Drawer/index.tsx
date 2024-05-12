import React from 'react';
import "./index.css";

interface Props {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Drawer = (props: Props) => {
  return (
    <React.Fragment>
      <div className={`overlay ${props.open ? "show" : "close"}`} onClick={props.onClose}></div>
      <div className={`drawer-root ${props.open ? "show" : "close"}`}>{props.children}</div>
    </React.Fragment>
  )
}

export default Drawer;
